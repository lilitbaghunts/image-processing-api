const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    fullName: String,
    email: String,
    googleId: String,
    picture: String,
    role: Number,
    refreshTokens: [{
        type: String
    }]
  })


module.exports = mongoose.model('User', UserSchema) 