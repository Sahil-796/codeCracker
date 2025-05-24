const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const axios = require('axios')




router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password').populate('friends','username totalSolved')
        
        // promise.all (promise.allSettled), another chad functionality of js, allows us to run multiple apis simultaneously ensuring each would return a response. How convieint is that !!!!

        const platStatsResults = await Promise.allSettled(
        user.platforms.map( async (pf) => {
            let stats = {}
            try{
            switch (pf.platform) {
                case 'leetcode':
                    const responseL = await axios.get(`https://alfa-leetcode-api-fz0q.onrender.com/userProfile/${pf.username}`)
                    stats = {
                        totalSolved : responseL.data.totalSolved, 
                        totalSubmissions : responseL.data.totalSubmissions, 
                        calendar: responseL.data.submissionCalendar,
                        ranking : responseL.data.ranking
                    }
                    break;
                case 'codeforces':
                    const responseCf = await axios.get(`https://codeforces-api-we09.onrender.com/user/${pf.username}`)
                    const response2Cf = await axios.get(`https://codeforces-api-we09.onrender.com/user/${pf.username}/solved`)
                    const response3Cf = await axios.get(`https://codeforces-api-we09.onrender.com/user/${pf.username}/rating`)
                    stats = {
                        totalSolved : responseCf.data.total_solved, 
                        rating: responseCf.data.rating,
                        rank: responseCf.data.rank,
                        perDay: response2Cf.data.solved_per_day,
                        contestData: Array.isArray(response3Cf.data) && response3Cf.data.length > 0
                                    ? response3Cf.data
                                    : null
                    }
                    break;

                default:
                    stats = {}

            }

        return {
            platform: pf.platform,
            username: pf.username,
            stats,
            error: null
            };
        }catch (err) {
            return {
                platform : pf.platform,
                username: pf.username,
                stats: {},
                error: err.message || 'Failed to fetch'
            }
        }
        }))
        
    const platStats = platStatsResults.map(result =>
  result.status === 'fulfilled' ? result.value : result.reason
);


const totalSolved = platStats.reduce((sum, pf) => sum + (pf.stats?.totalSolved || 0), 0);


    user.totalSolved = totalSolved
    await user.save()
    
    return res.json(
        {
            ...user.toObject(),
            platformStats: platStats
        }

    )
    }
    catch (err) {
        
        res.status(500).json({ message: "Server error" });
    }
    
})
module.exports = router