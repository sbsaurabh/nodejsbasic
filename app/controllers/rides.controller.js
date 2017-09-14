var MongoClient = require('mongodb').MongoClient
var URL = 'mongodb://localhost:27017/car_pooling';
var Model = require('../models/model');

const NodeGeocoder = require('node-geocoder');
const options = {
provider: 'google',
httpAdapter: 'https',
apiKey: 'AIzaSyCY8sJHx7DaLUKmp9qs_nj6DjLuIJPfAog',
formatter: null
};
const geocoder = NodeGeocoder(options);

module.exports = {
	showRides: function(req,res)   {
		res.render('pages/rides');
	},


	raiseRides :function(req,res)
	{
      // var pickupLocation ="";
			// geocoder.geocode(req.body.pickup_location, function(err, res) {
			// 	var pickupLocation = res[0].latitude +"," + res[0].longitude;
			// });
console.log(Model);
			var ride =new Model.Rides({
				rider_name:req.body.fname,
				rider_phone:req.body.phone,
				rider_pickup_location:req.body.pickup_location,
				rider_drop_location:req.body.drop_location,
				rider_stopover_location:req.body.stopover_location,
				rider_pickup_date:req.body.pickup_date,
				rider_start_time_hours:req.body.pickup_hours +":"+ req.body.pickup_minutes,
				seats_available:req.body.seats,
				price_per_cotraveller:req.body.price,
				created_at:new Date(),
          });

					console.log(ride);
		// var ride = {
		//
		// 	rider_name:req.body.fname,
		// 	rider_phone:req.body.phone,
		// 	rider_pickup_location:req.body.pickup_location,
		// 	rider_drop_location:req.body.drop_location,
		// 	rider_stopover_location:req.body.stopover_location,
		// 	rider_pickup_date:req.body.pickup_date,
		// 	rider_start_time_hours:req.body.pickup_hours +":"+ req.body.pickup_minutes,
		// 	seats_available:req.body.seats,
		// 	price_per_cotraveller:req.body.price,
		// 	created_at:new Date(),
		// }

		// var document = ride;
		// MongoClient.connect(URL, function(err, db) {
		// 	if (err) throw err;
		// db.collection("Rides").insertOne(document, function(err, res) {
		// 	if (err) throw err;
		// 	console.log("1 document inserted");
		// 	db.close();
		//   });
		//
		//
		//
		//   db.collection('Rides').find().toArray(function(err, result) {
		// 	if (err) return console.log(err)
		// 	//res.render('pages/events', {rides:result,topicHead : 'Form Submitted'});
		//   	})
		//
		// });

		ride.save(function(err,ride){
			if(err)
			{
					res.send(err);
			}

			console.log("1 document inserted");
			res.render('pages/rides');

		});

	}
};
