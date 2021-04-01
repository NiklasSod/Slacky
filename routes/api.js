const express = require('express')
const router = express.Router()

const User = require('../models/users')

const { ensureAuthenticated } = require('../config/auth.js')
router.use('*', ensureAuthenticated)

// parse json
router.use(express.json())

router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) return handleError(err)
        res.status(200).json(users)
    })
})

module.exports = router