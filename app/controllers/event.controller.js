var MongoClient = require('mongodb').MongoClient
var URL = 'mongodb://localhost:27017/car_pooling'
module.exports = {
	showEvents : function (req,res){

		MongoClient.connect(URL, function(err, db) {
		db.collection('Rides').find().toArray(function (err, result)  {
		if (err) return console.log(err)
			// res.render('index.ejs', {quotes: result})
		// console.log(result[5].ride);
		res.render('pages/events', {rides:result,topicHead:''});
	  	})

		});
	}
};
