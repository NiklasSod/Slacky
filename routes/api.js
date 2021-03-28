const express = require('express')
const router = express.Router()
const Channel = require('../models/channel')
const User = require('../models/users')
const { ensureAuthenticated } = require('../config/auth.js')

// parse json
router.use(express.json())

router.get('/users', ensureAuthenticated, (req, res) => {
    User.find({}, (err, users) => {
        if (err) return handleError(err)
        res.status(200).json(users)
    })
})

module.exports = router