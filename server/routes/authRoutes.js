const passport = require('passport');
const mongoose = require('mongoose');
const { response } = require('express');


module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
        })
    );
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });
    app.get('/auth/google/callback', passport.authenticate('google'));
    
    app.get('/api/current_user', (req, res) => {
        // const User = mongoose.model('users');

        // User.findById('6054be103415fd4f479ee85d')
        // .then(user => {
        //     console.log(user);
        // });
        res.send(req.user)
    })
}