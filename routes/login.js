const { response } = require('express')
const express = require('express')
const router = express.Router()
const User = require('../models/users')

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', (req, res) => {
    // login
    res.redirect('/home')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const {name, password} = req.body
    // Deconstructed code instead of writing
    // const name = req.body.name & pass

    // console.log(`Name: ${name}, password: ${password}`)
    const errors = []
    if (name.length < 3 || name.length > 12) {
        errors.push({msg: 'Name length must be between three and twelve characters long.'})
    } if (password.length < 6) {
        errors.push({msg: 'Password must be at least six characters long.'})
    } if(errors.length > 0) {
        res.render('register', {errors})
    }
    res.redirect('/')
})

module.exports = router