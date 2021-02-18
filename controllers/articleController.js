const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('create');
});

router.get('/')

module.exports = router;