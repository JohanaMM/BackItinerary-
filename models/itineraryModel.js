const mongoose = require("mongoose")

const itinerariesSchema = mongoose.Schema({
    collaborator:{ type: String, required: true },
    profileImage:{ type: String, required: true },
    imageItineraryA: { type: String, required: true },
    imageItineraryB: { type: String, required: true },
    imageItineraryC: { type: String, required: true },
    titleActivity: { type: String, required: true },
    description:{ type: String, required: true},
    price: { type: Number, required: true },
    time: { type: String, required: true },
    hashtag: { type: String, required: true },
    idCity: { type: mongoose.Schema.Types.ObjectId, required: true },
    likes: { type: Number, required: true },

})

const Itinerary = mongoose.model("itineraries", itinerariesSchema)
module.exports = Itinerary