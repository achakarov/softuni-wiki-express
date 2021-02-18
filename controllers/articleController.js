const router = require('express').Router();
const Article = require('../models/Article');

router.get('/create', (req, res) => {
    res.render('create');
});




router.post('/create', (req, res, next) => {
    const { title, description } = req.body;
    Article.create({title, description, author:res.user._id})
        .then((createdArticle) => {
            res.redirect('/');
        })
        .catch(next);
});

module.exports = router;