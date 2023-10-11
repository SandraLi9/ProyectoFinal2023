const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({

    title: String,
    date: {type: Date, default: Date.now},
    content: String,
    author: String

});

module.exports = mongoose.model('Article', ArticleSchema);