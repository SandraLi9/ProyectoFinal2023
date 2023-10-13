let express = require('express');
let Article = require('../controllers/article');
const article = require('../models/article');

//Llamamos al objeto router de express
let router = express.Router();

//Rutas para los articulos

router.post('/save', Article.save);

router.get('/articles', Article.getArticles);

router.delete('/delete/:id', Article.delete);

module.exports = router;
