const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/users')

module.exports = function (passport) {
    passport.use(new LocalStrategy(
        {
            usernameField: 'name'
        },
        function (username, password, done) {
            User.findOne({name: username}, function (err, user) {
                if (err) {
                    return done(err)
                }
                if (!user) {
                    return done(null, false, {message: 'Incorrect username.'})
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        throw err
                    }
                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, {message: 'Incorrect password.'})
                    }
                })
            })
        }
    ))
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user)
        })
    })
}