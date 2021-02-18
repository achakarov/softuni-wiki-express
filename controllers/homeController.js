const router = require('express').Router();
const isAuthNeeded = require('../middlewares/isAuthNeeded');
const articleService = require('../services/articleService');

router.get('/', isAuthNeeded(false), (req, res, next) => {
    articleService.getThreeMostRecentArticles()
        .then(articles => {
            //TODO Show only 50 characters of each article;
            res.render('home', { articles });
        })
        .catch(next);
});

module.exports = router;