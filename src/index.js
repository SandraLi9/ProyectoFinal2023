'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const port = 3900;

let url = 'mongodb+srv://vivianarm0818:nMd9jjFbLSfo8VoY@cluster0.dqbshiq.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = global.Promise;

let article_routes = require('./routes/article');

//Aqui cargué un body parser, para analizar cuerpos por medio de una url

app.use(bodyParser.urlencoded({extended:false}));

//Cualquier petició la convertimos en formato JSON
app.use(bodyParser.json());

//Activamos CORS para permitir las peticiones asincronas y HTTP desde el front
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

app.use('/api', article_routes);

/*app.listen(port, () => {
    console.log('listening on port ' + port);
});*/

//Nos conectamos a mongoDB. Opción { useNewUrlParser: true } para utilizar las últimas funcionalidades de mongoDB 
mongoose.connect(url, { useNewUrlParser: true }).then(() =>{

	console.log('Conexión con la BDD realizada con éxito!!!');

	app.listen(process.env.PORT || port, () =>{
		console.log('servidor ejecutándose aqui http://localhost:' + port );
	});

});