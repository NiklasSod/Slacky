const express = require('express')
const router = express.Router()

const { ensureAuthenticated } = require('../config/auth.js');

const Channel = require('../models/channel');
const User = require('../models/users')

router.get('/', ensureAuthenticated, (req, res) => {
    Channel.find((err, data) => {
        if (err) return console.error(err);
        res.render('profile', { channels: data, user: req.user });
    });
})

router.post('/editName', ensureAuthenticated, (req, res) => {
    const userName = req.body.newUserName;
    User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { name: userName } },
        { new: true },
        (err, data) => {
        if (err) {
            console.log(err);
            req.flash('error_msg', 'Username already exists!')
            res.redirect('/profile')
        } else {
            req.flash('success_msg', 'Your username is updated!')
            res.redirect('/profile')
            }
        }
    );
});

router.post('/photo', ensureAuthenticated, (req, res) => {
    if (req.files) {
    const profile_pic = req.files.profile_photo
    const extension = profile_pic.name.split('.').slice(-1)[0]
    const file_name = `/uploads/${req.user._id}.${extension}`
    profile_pic.mv(`.${file_name}`)
    User.updateOne(
        { _id: req.user._id },
        { $set: { profilePhoto: file_name } },
        (err) => {
            if (err) console.log(err)
            res.redirect('/profile')
        }
    )
    } else {
        req.flash('error_msg', 'Something went wrong...')
        res.redirect('/profile')
    }
})

module.exports = router