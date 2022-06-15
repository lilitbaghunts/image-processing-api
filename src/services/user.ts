const User = require('../models/user')

export const getUser = (email: string) => User.findOne({ email }).exec()

export const updateUserTokens = (email: string, token: string) => User.update({ email }, { $push: { refreshTokens: token }}) 
