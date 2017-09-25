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
	showEvents : function (req,res){

		MongoClient.connect(URL, function(err, db) {
		db.collection('Rides').find().toArray(function (err, result)  {
		if (err) return console.log(err)
			// res.render('index.ejs', {quotes: result})
		// console.log(result[5].ride);
		res.render('pages/events', {rides:result,topicHead:''});
	  	})

		});
	},

	getRide : function(req,res)
	{
		var ride={};
		res.render('pages/getride',{rides:ride});
	},

	showRelatedRide: function(req,res)
	{
		geocoder.batchGeocode([req.body.pickup_location,req.body.drop_location], function(err, result) {
			if(err){
				console.log(err);
			}
			var pickup_longitude = result[0].value[0].longitude;
			var pickup_latitude =  result[0].value[0].latitude;
			var drop_longitude = result[1].value[0].longitude;
			var drop_latitude =  result[1].value[0].latitude;
			var pickup_date = req.body.pickup_date;
				Model.Rides.find({
				$and: [

				          { $or: [ {rider_pickup_location: { $geoIntersects: { $geometry: { type: "Point", coordinates:[pickup_latitude,pickup_longitude]
															} } } }, {rider_stopover_location: { $geoIntersects: { $geometry: { type: "Point", coordinates:[pickup_latitude,pickup_longitude]
														} } } }
												 ]
									} ,
				          { $or: 	[ {rider_drop_location: { $geoIntersects: { $geometry: { type: "Point", coordinates:[drop_latitude,drop_longitude]
														} } } }, {rider_stopover_location: { $geoIntersects: { $geometry: { type: "Point", coordinates:[drop_latitude,drop_longitude]
														} } } }
													]
									},
									{rider_pickup_date:pickup_date}
      				]
					},function(err,ride){
						if(err){
							console.log(err);
						}
						console.log(ride);
						//res.send(ride);
						res.render('pages/getride', {rides:ride});

			});
		});
	}


};
