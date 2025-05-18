const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();


router.post('/register', async (req, res) =>{

    const {username, email, password} = req.body
    const userExists = await User.findOne({email})

    if(userExists){
        return res.status(400).json({ message : 'User already exists' })
    }

    try {
        const user = new User({
            username, email, password, platforms:[], friends:[]} )
        await user.save()

        res.status(201).json({
            message: 'User registered successfully'
        })
    }
         catch (err) {
            res.status(500).json({message: 'Server error'})
        }
    
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user || user.password !== password){
        return res.status(400).json({message: 'Invalid email or password'})
    }

    const payload = {
        userId: user._id,
        email: user.email,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})

    res.status(200).json({
    message: 'Login successful',
    token,
  });

})

module.exports = router