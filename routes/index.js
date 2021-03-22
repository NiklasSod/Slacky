const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../config/auth.js');

const Channel = require('../models/channel');

router.get('/', ensureAuthenticated, (req, res) => {
  Channel.find((err, data) => {
    if (err) return console.error(err);
    res.render('index.ejs', { channels: data });
  });
});

router.post('/create', ensureAuthenticated, (req, res) => {
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

router.get('/delete/:id', ensureAuthenticated, (req, res) => {
  Channel.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) return console.error(err);
    console.log(req.params.id + 'deleted');
    res.redirect('/home');
  });
});

module.exports = router;
