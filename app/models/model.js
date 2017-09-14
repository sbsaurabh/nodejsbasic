var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var Rides = new Schema({
  rider_name:String,
  rider_phone:String,
  rider_pickup_location:String,
  rider_drop_location:String,
  rider_stopover_location:[{}],
  rider_pickup_date:String,
  rider_start_time_hours:String,
  seats_available:Number,
  price_per_cotraveller:Number,
  created_at:Date,
})

var Rides = mongoose.model('rides', Rides);

// make this available to our users in our Node applications
module.exports = {Rides:Rides};
