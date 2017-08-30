const fs = require('fs');
const express = require('express');
const bodyParser= require('body-parser');
var path = require('path');

app = express(),
port = process.env.PORT || 8080,
expressLayouts = require('express-ejs-layouts');

app.use(bodyParser.urlencoded({extended: true}));

//set view engine and view path
app.set('view engine', 'ejs');
app.use(expressLayouts);
var viewPath = path.join(__dirname, 'app/views');
app.set('views', viewPath);

 
var MongoClient = require('mongodb').MongoClient
var URL = 'mongodb://localhost:27017/car_pooling'

app.use(require('./app/routes'));


app.use(express.static(__dirname + '/app/public'));

//app.use("/public", express.static(path.resolve(__dirname, 'public')));


// MongoClient.connect(URL, function(err, db) {
//   if (err) return

app.listen(3010, () => {
	console.log('listening on 3010')
})

// 	app.get('/', (req, res) => {
//   		db.collection('quotes').find().toArray((err, result) => {
// 		if (err) return console.log(err)
// 			// renders index.ejs
// 			res.render('index.ejs', {quotes: result})
// 	  	})
// 	})




 
// })




  	

