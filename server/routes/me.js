const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const axios = require('axios')




router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password').populate('friends','username totalSolved')
        
        // promise.all, another chad functionality of js, allows us to run multiple apis simultaneously ensuring each would return a response. How convieint is that !!!!
        const platStats = await Promise.all(
        user.platforms.map( async (pf) => {
            let stats = {}
            switch (pf.platform) {
                case 'leetcode':
                    const responseL = await axios.get(`http://localhost:3000/userProfile/${pf.username}`)
                    stats = {
                        totalSolved : responseL.data.totalSolved, 
                        totalSubmissions : responseL.data.totalSubmissions, 
                        calendar: responseL.data.submissionCalendar,
                        ranking : responseL.data.ranking
                    }
                    break;
                case 'codeforces':
                    const responseCf = await axios.get(`https://codeforces-api-oq6l.onrender.com/user/${pf.username}`)
                    const response2Cf = await axios.get(`https://codeforces-api-oq6l.onrender.com/user/${pf.username}/solved`)
                    stats = {
                        totalSolved : responseCf.data.total_solved, 
                        calendar: responseCf.data.submissionCalendar,
                        rating: responseCf.data.rating,
                        rank: responseCf.data.rank,
                        calendar: response2Cf.solved_per_day
                    }
                    break;

                default:
                    stats = {}

            }

        return {
            platform: pf.platform,
            username: pf.username,
            stats
            };
        }))
        
    const totalSolved = platStats.reduce((sum, pf)=>{
        return sum + (pf.stats.totalSolved || 0)
    }, 0)

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
        console.log(err)
    }
    
})
module.exports = router



{/*{
    "_id": "682c16c3faec7c7cdf3f16db",
    "username": "sahil",
    "email": "sahil@a.com",
    "platforms": [
        {
            "_id": "682c19a4faec7c7cdf3f16e0",
            "platform": "leetcode",
            "username": "Sahil796"
        }
    ],
    "friends": [],
    "totalSolved": 0,
    "createdAt": "2025-05-20T05:44:35.760Z",
    "updatedAt": "2025-05-20T05:44:35.760Z",
    "__v": 0,
    "platformStats": [
        {
            "platform": "leetcode",
            "username": "Sahil796",
            "stats": {
                "totalSolved": 97,
                "totalSubmissions": [
                    {
                        "difficulty": "All",
                        "count": 97,
                        "submissions": 282
                    },
                    {
                        "difficulty": "Easy",
                        "count": 30,
                        "submissions": 85
                    },
                    {
                        "difficulty": "Medium",
                        "count": 63,
                        "submissions": 185
                    },
                    {
                        "difficulty": "Hard",
                        "count": 4,
                        "submissions": 12
                    }
                ],
                "calendar": {
                    "1730764800": 2,
                    "1734825600": 1,
                    "1734998400": 2,
                    "1735084800": 1,
                    "1735257600": 9,
                    "1736035200": 1,
                    "1736294400": 1,
                    "1736640000": 27,
                    "1736726400": 14,
                    "1736985600": 6,
                    "1737072000": 6,
                    "1737244800": 9,
                    "1737331200": 10,
                    "1737417600": 14,
                    "1738281600": 2,
                    "1738454400": 2,
                    "1738540800": 9,
                    "1738713600": 4,
                    "1738886400": 4,
                    "1738972800": 7,
                    "1739059200": 7,
                    "1739145600": 1,
                    "1739232000": 5,
                    "1739318400": 2,
                    "1739404800": 12,
                    "1739664000": 1,
                    "1739836800": 3,
                    "1739923200": 1,
                    "1740009600": 1,
                    "1740096000": 2,
                    "1740182400": 4,
                    "1740268800": 16,
                    "1740355200": 9,
                    "1740441600": 6,
                    "1740528000": 11,
                    "1740614400": 3,
                    "1740787200": 1,
                    "1740873600": 2,
                    "1740960000": 2,
                    "1741046400": 7,
                    "1741132800": 8,
                    "1741219200": 2,
                    "1741305600": 1,
                    "1741478400": 5,
                    "1741737600": 4,
                    "1742774400": 1,
                    "1742947200": 1,
                    "1743033600": 1,
                    "1743120000": 2,
                    "1743206400": 2,
                    "1743292800": 6,
                    "1743379200": 2,
                    "1743465600": 1,
                    "1743811200": 1,
                    "1743897600": 2,
                    "1744156800": 1,
                    "1744243200": 3,
                    "1744761600": 3,
                    "1744848000": 8,
                    "1745798400": 1
                }
            }
        }
    ]
}*/}