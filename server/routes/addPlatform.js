const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const axios = require('axios')


router.post('/addPlatform', authMiddleware, async (req, res)=>{

  const platformToAdd = req.body.platform
  const handle = req.body.handle

  try {
    const user = await User.findById(req.user.userId)
        if (!user) {
          return res.status(404).json({ message: "User not found, jokes on you."})
        }
        if(!user.platforms.includes(platformToAdd)){
            user.platforms.push({"platform":platformToAdd,"username":handle})
    
            await user.save()
            return res.status(200).json({message: "Platform added"})
        }else{
        return res.status(400).json({message : "Platform already added."}) 
        }
  } catch (err) {
          console.log(err)
          return res.status(500).json({message : "something went wront"})
        }

})

module.exports = router