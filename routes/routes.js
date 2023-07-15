const Routes = require ("express").Router()

const itinerariesControllers = require ("../controllers/itinerariesControllers")
const {getAllItinerariesInCity, addOneItinerary, getOneItinerary, modifyItinerary, getAllItineraries, removeItinerary} = itinerariesControllers

Routes.route("/itineraries/:id")
.get(getOneItinerary)
.put(modifyItinerary)
.delete(removeItinerary)

Routes.route("/itineraries/cities/:idCity")
.get(getAllItinerariesInCity)

Routes.route("/itineraries")
.get(getAllItineraries)
.post(addOneItinerary)

module.exports = Routes