const Article = require('../models/Article');

async function getAllArticles() {
    let articles = await Article.find({}).lean();
    return articles;
}

async function getThreeMostRecentArticles() {
    let articles = await Article.find({}).lean().sort({ creationDate: -1 }).limit(3);
    return articles;
}

function getOne(id) {
    return Article.findById(id).lean();
}

function deleteOne(id) {
    return Article.deleteOne(id);
}

async function getArticlesOfAuthor(articleId, authorId) {

}

module.exports = {
    getAllArticles,
    getThreeMostRecentArticles,
    getOne,
    deleteOne
}