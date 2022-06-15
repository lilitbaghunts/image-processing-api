import passport from 'passport'

export const googleAuth = passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'] 
   })