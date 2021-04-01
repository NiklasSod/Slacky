const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../config/auth.js');
router.use('*', ensureAuthenticated)

const Channel = require('../models/channel');

router.get('/', (req, res) => {
  Channel.find((err, data) => {
    if (err) return console.error(err);
    res.render('index.ejs', { channels: data, user: req.user });
  });
});

router.post('/create', (req, res) => {
  const channel = new Channel({
    name: req.body.name,
    description: req.body.description || '',
    private: req.body.private ? true : false,
  });
  channel.save((err) => {
    if (err) return console.error(err);
    console.log('Channel created.');
    res.redirect('/home');
  });
});

router.get('/delete/:id', (req, res) => {
  Channel.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) return console.error(err);
    res.redirect('/home');
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are now logged out!')
  res.redirect('/')
});

module.exports = router;
