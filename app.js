// Dependencies
const express = require('express')
const app = express()
// const path = require('path')
const flash = require('connect-flash')
const passport = require('passport')
const mongoose = require('mongoose')
const expressEjsLayout = require('express-ejs-layouts')
const session = require('express-session')

// Connect to database
mongoose.connect('mongodb://localhost:27017/slacky')
    .then(() => console.log('Connected to db'))
    .catch(error => console.log(error))

// EJS
app.set('view engine', 'ejs')
app.use(expressEjsLayout)

// BodyParser
app.use(express.urlencoded({extended: true}))

// Public path
// app.use('/public', express.static(path.join(__dirname, 'public')))

// Sessions
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Passport
app.use(passport.initialize())
app.use(passport.session())

// set flash before routes
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// Routes
app.use('/', require('./routes/login.js'))
app.use('/home', require('./routes/home.js'))

// Open connection
const port = 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})