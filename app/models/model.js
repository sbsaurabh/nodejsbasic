var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var Rides = new Schema({
  rider_name:String,
  rider_phone:String,
  rider_pickup_location: {
        type: { type: String },
        coordinates: [[['number']]],
    },
  rider_drop_location: {
        type: { type: String },
        coordinates:[[['number']]],
    },
  rider_stopover_location:[{type: { type: String },
  coordinates: [[['number']]],}],
  rider_pickup_date:String,
  rider_start_time_hours:String,
  seats_available:Number,
  price_per_cotraveller:Number,
  created_at:Date,
  pickup_location_name:String,
  drop_location_name:String
})

Rides.index({ "rider_pickup_location": "2dsphere" });
Rides.index({ "rider_drop_location": "2dsphere" });
Rides.index({ "rider_stopover_location": "2dsphere" });

var Rides = mongoose.model('rides', Rides);

// make this available to our users in our Node applications
module.exports = {Rides:Rides};
