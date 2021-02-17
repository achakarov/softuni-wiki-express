const router = require('express').Router();
const isAuthNeeded = require('../middlewares/isAuthNeeded'); 
const registerValidator = require('../middlewares/registerValidator');
const { COOKIE_NAME } = require('../config/config');
const authService = require('../services/authService');

router.get('/login', isAuthNeeded(false), (req, res) => {
    res.render('login');
});

router.get('/register', isAuthNeeded(false), (req, res) => {
    res.render('register');
});

router.get('/logout', (req, res) => {
    res
        .clearCookie(COOKIE_NAME)
        .redirect('/');
});

router.post('/register', isAuthNeeded(false), registerValidator, (req, res, next) => {
    const { email, password } = req.body;
    authService.register(email, password)
        .then(createdUser => {
            res.redirect('/auth/login');
        })
        .catch(next);
});

router.post('/login', isAuthNeeded(false), (req, res, next) => {
    const { email, password } = req.body;
    authService.login(email, password)
        .then(token => {
            res.cookie(COOKIE_NAME, token, { httpOnly: true });
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
});

module.exports = router;