import passport from 'passport'
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')
const { BASE_URL } = process.env

const GOOGLE_CALLBACK_URL = `${BASE_URL}/api/google/callback`

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    passReqToCallback: true
}, async (req: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
        console.log(accessToken)
        const defaultUser = {
            fullName: `${profile.name.givenName} ${profile.name.familyName}`,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
            googleId: profile.id
        }
        let user = await User.findOne({ googleId: defaultUser.googleId }).exec()
        if (!user) {
            user = await (new User({ ...defaultUser, role: 0 })).save()
        }
        req.user = {
            email: user.email,
            role: user.role,
            refreshTokens: user.refreshTokens
        }
        done(null, user._doc)
    } catch (err) {
        console.log('err', err)
        done(err, null)
    }
}))

/*
Session based authentication usecase
passport.serializeUser((user, done ) => {
    done(null, user._id)
})
passport.deserializeUser(async (userId, done) => {
    try {
        const userData = await User.findById(userId).exec()
        if (userData) {
            done(null, userData)
        }
    } catch (err) {
        done(err, null)
    }
})
*/