
var Model = require('../models/model');
const circleToPolygon = require('circle-to-polygon');
const radius = 1000; // in meters
const numberOfEdges = 50;

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

			geocoder.batchGeocode([req.body.pickup_location,req.body.drop_location], function(err, result) {
				if(err){
					console.log(err);
				}
         if(req.body.pickup_location != '')
				 	{
						 var pickup_longitude = result[0].value[0].longitude;
						 var pickup_latitude =  result[0].value[0].latitude;
			 		}

					if(req.body.drop_location != '')
					{
						 var drop_longitude = result[1].value[0].longitude;
					   var drop_latitude =  result[1].value[0].latitude;
			 		}
				 var pickup_polygon = circleToPolygon([pickup_latitude,pickup_longitude], radius, numberOfEdges);
         var drop_polygon = circleToPolygon([drop_latitude,drop_longitude], radius, numberOfEdges);

				 var stop_over=[];
				 if(req.body.stopover_location.constructor !== Array)
				 {
					 stop_over.push(req.body.stopover_location);
				 }
				 else{
					 stop_over =req.body.stopover_location;
				 }
				 geocoder.batchGeocode(stop_over, function(err, response) {
				 	if(err){
				 		console.log(err);
				 	}
          var stopover_location_cor = [];
					if(req.body.stopover_location != '')
					{
							    var stopover_location = [];
									stopover_location.push(response[0].value[0].latitude);
									stopover_location.push(response[0].value[0].longitude);
									var stop_polygon = circleToPolygon(stopover_location, radius, numberOfEdges);

									stopover_location_cor.push(stop_polygon);
									if(req.body.stopover_location.constructor === Array && typeof req.body.stopover_location[1] !== 'undefined')
									{
							   		var stopover_location =[];
										stopover_location.push(response[1].value[0].latitude);
										stopover_location.push(response[1].value[0].longitude);
										var stop_polygon = circleToPolygon(stopover_location, radius, numberOfEdges);

										stopover_location_cor.push(stop_polygon);
									}

									if(req.body.stopover_location.constructor === Array && typeof req.body.stopover_location[2] !== 'undefined')
									{
							   		var stopover_location =[];
								 		stopover_location.push(response[2].value[0].latitude);
								 		stopover_location.push(response[2].value[0].longitude);
										var stop_polygon = circleToPolygon(stopover_location, radius, numberOfEdges);

										stopover_location_cor.push(stop_polygon);
									}

					}

					var ride =new Model.Rides({
						rider_name:req.body.fname,
						rider_phone:req.body.phone,
						rider_pickup_location:pickup_polygon,
						rider_drop_location:drop_polygon,
						rider_stopover_location:stopover_location_cor,
						rider_pickup_date:req.body.pickup_date,
						rider_start_time_hours:req.body.pickup_hours +":"+ req.body.pickup_minutes,
						seats_available:req.body.seats,
						price_per_cotraveller:req.body.price,
						created_at:new Date(),
		          });
						ride.save(function(err,ride){
							if(err)
							{
									console.log(err);
							}
							if(ride){
							console.log("1 document inserted");
						}
							res.render('pages/rides');

						});

				});

});

	}
};
