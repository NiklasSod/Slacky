const express = require('express');
const app = express();
const loginRouter = require('./routes/login.js');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use('/', loginRouter);

app.get('/home', (req, res) => {
    res.render('home');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});