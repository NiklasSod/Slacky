const express = require('express');
const router = express();

router.set('view engine', 'ejs');

router.use(express.urlencoded({extended: true}));

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {

});

module.exports = router;