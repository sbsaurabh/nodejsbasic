//Create a new express router

const express = require('express'),
router = express.Router(),
	mainController = require('./controllers/main.controller'),
	eventsController = require('./controllers/event.controller'),
	ridesController = require('./controllers/rides.controller');;

//export router
module.exports = router;
router.get('/', mainController.showHome);
router.get('/getride',eventsController.getRide);
router.post('/getride',eventsController.showRelatedRide)
router.get('/rides',ridesController.showRides);
router.post('/rides',ridesController.raiseRides);
