const router = require('express').Router();
const isAuthNeeded = require('../middlewares/isAuthNeeded');

router.get('/', isAuthNeeded(false), (req, res) => {
    res.render('home');
});

module.exports = router;