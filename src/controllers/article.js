const { model } = require('mongoose');
let Article = require('../models/article');

//Creamos un objeto para disponer de todos los metodos de ruta que vamos a definir

let controller = {

    //Este metodo es para guardar un dato
    save: (req, res) => {
        let params = req.body;

        let article = new Article();
        // se asignan los valores
        article.title = params.title;
        article.content = params.content;
        article.author = params.author;
        //se guarda el articulo
        article.save().then((articleStored, err) => {
            console.log("Datos", err, articleStored);
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
        Article.find().sort('-date').exec()
            .then(articles => {
                if (!articles || articles.length === 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay notas para mostrar'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    articles
                });
            })
            .catch(err => {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al extraer los datos',
                    error: err
                });
            });
    },
    //metodo para eliminar una nota
    delete: (req, res) => {
        // Recoger el ID a través de la URL
        let articleId = req.params.id;
    
        Article.findOneAndDelete({ _id: articleId })
            .then(articleRemove => {
                if (!articleRemove) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No se ha encontrado la nota a eliminar'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    article: articleRemove
                });
            })
            .catch(err => {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al eliminar la nota',
                    error: err
                });
            });
    }}
    

module.exports = controller;