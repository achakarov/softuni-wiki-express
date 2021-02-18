const router = require('express').Router();
const Article = require('../models/Article');
const articleService = require('../services/articleService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.get('/', (req, res, next) => {
    articleService.getAllArticles()
        .then(articles => {
            res.render('all-articles', { articles });
        })
        .catch(next);
});

router.get('/details/:_id', async (req, res, next) => {

    try {
        let article = await articleService.getOne(req.params._id);
        let authorId = article.author;
        let isAuthor = authorId.toString() === res.user._id.toString();
        res.render('details', { article, isAuthor });

    } catch (error) {
        return next({ message: error, status: 400 });
    }
});

router.get('/delete/:_id', (req, res, next) => {
    articleService.deleteOne({ _id: req.params._id })
        .then(result => {
            res.redirect('/');
        })
        .catch(next);
});

router.get('/edit/:_id', (req, res, next) => {
    Article.findOne({ _id: req.params._id })
        .lean()
        .then(article => {
            res.render('edit', { ...article });
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

router.post('/edit/:_id', (req, res, next) => {
    const { _id } = req.params;
    Article.updateOne({ _id }, { $set: { ...req.body } })
        .then(updatedArticle => {
            res.redirect(`/articles/details/${_id}`);
        })
        .catch(next);
});

module.exports = router;