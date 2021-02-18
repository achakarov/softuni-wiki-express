const router = require('express').Router();
const Article = require('../models/Article');
const articleService = require('../services/articleService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.get('/', (req, res, next) => {
    articleService.getAllArticles()
        .then(articles => {
            console.log(articles)
            res.render('all-articles', {articles});
        })
        .catch(next);
});




router.post('/create', (req, res, next) => {
    const { title, description } = req.body;
    if (title.length < 5) {
        return next({ message: 'Title must be at least 5 characters long', status: 400 });
    }

    if (description.length < 20) {
        return next({ message: 'Description must be at least 20 characters long', status: 400 });
    }

    Article.create({ title, description, author: res.user._id })
        .then((createdArticle) => {
            res.redirect('/');
        })
        .catch(next);
});

module.exports = router;