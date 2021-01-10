//Express
const express = require('express');
//Mongoose
const mongoose = require('mongoose');
//Morgan (Monitor de peticiones)
const morgan = require('morgan');

//Inicia el server
const app = express();
mongoose.connect('mongodb://localhost/proyecto_pila_1_db')
.then(console.log('DB Connected'))
.catch(err => console.log(err));


//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/tasks', require('./routes/tasks.js'));

//Static files

console.log(__dirname +'/public');
app.use(express.static(__dirname +'/public'))

//Server is listening
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
})