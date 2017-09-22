//const fs = require('fs');
const express = require('express');
const bodyParser= require('body-parser');
var path = require('path');

const router = require('./app/routes');
app = express(),
port = process.env.PORT || 8080,
expressLayouts = require('express-ejs-layouts');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(expressLayouts);
var viewPath = path.join(__dirname, 'app/views');
app.set('views', viewPath);

const mongoose = require('mongoose');
//DB setup
mongoose.connect('mongodb://localhost:/car_pooling',{ useMongoClient: true });

app.use(router);
app.use(express.static(__dirname + '/app/public'));
app.listen(3010);
	console.log('listening on 3010');


// 	app.get('/', (req, res) => {
//   		db.collection('quotes').find().toArray((err, result) => {
// 		if (err) return console.log(err)
// 			// renders index.ejs
// 			res.render('index.ejs', {quotes: result})
// 	  	})
// 	})





// })
