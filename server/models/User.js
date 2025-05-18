const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: [true, 'Please add a name']
    },
    email:{
        type: String,
        required: [true, 'Please add an email'],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a paswword']
    },
    platforms: [{
        platform:{ type: String, required: true},
        username: { type: String, required: true}
        }],
    friends: [{
        type:mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    totalSolved: { type: Number, default: 0},
    lastUpdated: { type: Date }
    

},

{timestamps: true}
)

const User = mongoose.model('User', userSchema, 'userData')

module.exports = User