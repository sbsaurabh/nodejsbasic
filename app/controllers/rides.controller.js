var MongoClient = require('mongodb').MongoClient
var URL = 'mongodb://localhost:27017/car_pooling'

module.exports = {
	showRides: (req,res) =>  {
		res.render('pages/rides');
	} 
};

app.post('/rides',function(req,res){
	var ride = {
		ride_date:"31/08/2017",
		rider_name:req.body.fname,
		rider_phone:req.body.phone,
		rider_start:"28.721028, 77.107126",
		rider_end:"28.625282, 77.373244",
		rider_stop_first:"27,74",
		rider_stop_second:"28,76",
		start_time:"7:00:00",
		end_time:"9:00:00",
		stop_first_time:"7:30:00",
		stop_second_time:"8:00:00",
		seats_available:"4",
		created_at:"",
		total_raised_rides:"10"
	}

	

	var document = {ride};
	MongoClient.connect(URL, function(err, db) {
		if (err) throw err;
	db.collection("Rides").insertOne(document, function(err, res) {
		if (err) throw err;
		console.log("1 document inserted");
		db.close();
	  });


	
	  db.collection('Rides').find().toArray((err, result) => {
		if (err) return console.log(err)
		res.render('pages/events', {rides:result,topicHead : 'Form Submitted'});
	  	})

	});


	 
});