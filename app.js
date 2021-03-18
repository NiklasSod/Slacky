// Dependencies
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash')
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

// Routes
const loginRouter = require('./routes/login.js')
const homeRouter = require('./routes/home.js')
app.use('/', loginRouter)
app.use('/home', homeRouter)

// Open connection
const port = 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})