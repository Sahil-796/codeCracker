const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const axios = require('axios')


router.post('/addFriend', authMiddleware, async (req, res)=>{

  const friend = req.body.friend

  try {
    
    const friendUser = await User.findOne({username: friend})
    if(!friendUser){
    return res.status(404).json({ message: "Friend not found, jokes on you."})
    }

    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: "User not found, jokes on you."})
    }


    if (user._id.toString() === friendUser._id.toString()) {
  return res.status(400).json({ message: "You cannot add yourself as a friend." });
}


    if(!user.friends.includes(friendUser._id.toString())){
      user.friends.push(friendUser._id)
      friendUser.friends.push(user._id)
      await user.save()
      await friendUser.save()
      return res.status(200).json({message: "Friend added"})
    }else{
      return res.status(400).json({message : "Friend already added."}) 
    }
}
  
        catch (err) {
          return res.status(500).json({message : "something went wront"})
        }

})

module.exports = router