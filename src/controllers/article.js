const { model } = require('mongoose');
var Article = require('../models/article');

//Creamos un objeto para disponer de todos los metodos de ruta que vamos a definir

var controller = {

    //Este metodo es para guardar un dato
    save: (req, res) => {
        var params = req.body;

        var article = new Article();
        // se asignan los valores
        article.title = params.title;
        article.content = params.content;
        article.author = params.author;
        //se guarda el articulo
        article.save((err, articleStored) => {
            if (err || !articleStored) {
                return res.status(404).send({
                    status: 'error',
                    message: 'La nota no se ha guardado'
                })
            }
            return res.status(200).send({
                status: 'succes',
                articleStored
            });
        });

    },
    //este metodo es para que los articulos queden en una lista
    getArticles: (req, res) => {
        var query = Article.find({});
        query.sort('-date').exec((err, articles) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al extraer los datos'
                });
            }
            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay notas para mostrar'
                });
            }
            return res.status(200).send({
                status: 'succes',
                articles
            });
        });

    },
    //metodo para eliminar una nota
    delete: (req, res) => {
        //Recoger el Id por medio de la url 
        var articleId = req.params.id;

        Article.findOneAndDelete({ _id: articleId }, (err, articleRemove) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al eliminar la nota'
                })
            }
            if (!articleRemove) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha encontrado la nota a eliminar'
                });
            }
            return res.status(200).send({
                status: 'succes',
                article: articleRemove
            });
        });
    }
}

module.exports = controller;