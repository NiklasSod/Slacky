const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../config/auth.js');

const Channel = require('../models/channel');
const Post = require('../models/post');

router.get('/:id', ensureAuthenticated, (req, res) => {
    Channel.findById(req.params.id, (err, data) => {
        if (err) return console.error(err);
        res.render('channel.ejs', { channel: data, user: req.user  });
    });
});

router.post('/:id', ensureAuthenticated, (req, res) => {
    const post = new Post({
        by: req.user.name,
        byId: req.user._id,
        content: req.body.content,
    });
    Channel.updateOne(
        { _id: req.params.id },
        { $push: { posts: post } },
        (err) => {
            if (err) return console.error(err);
            res.redirect(`/channel/${req.params.id}`);
        }
    );
});

module.exports = router;