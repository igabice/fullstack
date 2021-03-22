const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
            .then(existingUser => {
                if(existingUser){
                    console.log(existingUser);
                    //already have user
                    done(null, existingUser);
                    //     _id: 6054be103415fd4f479ee85d,
                    //     googleId: '106328475906062199580',
                }else{
                    new User({ googleId: profile.id }).save()
                    .then(user=> done(null, user));
                }
            })

            // console.log('access token', accessToken);
            // console.log('refresh token', refreshToken);
            // console.log('profile:', profile);
        }
    )
);