const mongoose = require('mongoose');
const { DB_URL } = require('./config');

module.exports = (app) => {
    mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('DB connected successfully!');
    });
}