const router = require('express').Router();
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const articleController = require('./controllers/articleController');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/articles', articleController);

module.exports = router;