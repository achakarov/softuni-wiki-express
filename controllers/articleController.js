const router = require('express').Router();
const Article = require('../models/Article');
const User = require('../models/User');
const articleService = require('../services/articleService');
const isAuthNeeded = require('../middlewares/isAuthNeeded');

router.get('/create', isAuthNeeded(false), (req, res) => {
    //TODO Logged in users are redirected to login page
    res.render('create');
});

router.get('/', isAuthNeeded(false), (req, res, next) => {
    articleService.getAllArticles()
        .then(articles => {
            res.render('all-articles', { articles });
        })
        .catch(next);
});

router.get('/details/:_id', async (req, res, next) => {
    //TODO Not logged in users can't access Details page
    //If ID is in user.createdArticles[] -> isAuthor = true;
    try {
        let article = await articleService.getOne(req.params._id);
        let authorId = article.author;
        let isAuthor = authorId.toString() === res.user._id.toString();
        res.render('details', { article, isAuthor });

    } catch (error) {
        return next({ message: error, status: 400 });
    }
});

router.get('/delete/:_id', isAuthNeeded(false), (req, res, next) => {
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


router.post('/create', isAuthNeeded(false), async (req, res, next) => {
    const { title, description } = req.body;
    if (title.length < 5) {
        return next({ message: 'Title must be at least 5 characters long', status: 400 });
    }

    if (description.length < 20) {
        return next({ message: 'Description must be at least 20 characters long', status: 400 });
    }

    try {
        let article = await Article.create({ title, description, author: res.user._id });

        const filter = { _id: article.author };
        const update = { $push: { createdArticles: article._id } };

        let user = await User.findOneAndUpdate(filter, update, {
            new: true
        });

        res.redirect('/');
    } catch (error) {
        return next({ message: error, status: 400 });
    }
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