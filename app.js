// Dependencies
const express = require('express')
const app = express()
const path = require('path')
const flash = require('connect-flash')
const passport = require('passport')
const mongoose = require('mongoose')
const expressEjsLayout = require('express-ejs-layouts')
const session = require('express-session')
const fileUpload = require('express-fileupload')
// "The http module has additional functionality such as managing sockets."
const http = require('http').Server(app)
const io = require('socket.io')(http)
var name = process.env.MONGO_USERNAME;
var password = process.env.MONGO_PASSWORD;

// Connect to database
// mongoose.connect('mongodb://localhost:27017/slacky')
// mongoose.connect(`mongodb+srv://${name}:${password}@cluster0.r5e16.mongodb.net/slacky`)

mongoose.connect('mongodb+srv://Slacky:MongoDB123123@cluster0.r5e16.mongodb.net/slacky', {useNewUrlParser:true})
    .then(() => console.log('Connected to db'))
    .catch(error => console.log(error))

// EJS
app.set('view engine', 'ejs')
app.use(expressEjsLayout)

// BodyParser
app.use(express.urlencoded({extended: true}))

// Public path
app.use('/public', express.static(path.join(__dirname, 'public')))

// Fileupload path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(fileUpload({ createParentPath: true }));

// Sessions
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Passport
require('./config/passport')(passport)
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
app.use('/home', require('./routes/index.js'))
app.use('/channel', require('./routes/channel.js'))
app.use('/api', require('./routes/api'))
app.use('/profile', require('./routes/profile'))

// Socket.io
io.on('connection', (socket) => {
    console.log('User connected')
})

// Open connection
const port = 3000;
http.listen(port, () => {
    console.log(`Listening to port ${port}`)
})