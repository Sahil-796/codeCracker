const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const axios = require('axios')

const platforms = [{platform:'leetcode',username:"Sahil796"}]


router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password').populate('friends','username totalSolved')
        
        // promise.all, another chad functionality of js, allows us to run multiple apis simultaneously ensuring each would return a response. How convieint is that !!!!
        const platStats = await Promise.all(
        user.platforms.map( async (pf) => {
            let stats = {}
            switch (pf) {
                case 'leetcode':
                    const response = axios.get('https://alfa-leetcode-api.onrender.com/')
                    // continue
            }
        }))
        
    //    console.log(user)

    
    return res.json(user)
    }
    catch (err) {
        console.log(err)
    }
    
})
module.exports = router