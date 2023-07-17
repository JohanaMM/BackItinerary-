const Itinerary = require("../models/itineraryModel")

const itinerariesControllers = {
    getAllItineraries: async (req, res) => {
        let itineraries
        let error = null

        try {
            itineraries = await Itinerary.find()
        } catch (err) { error = err }
        res.json({
            response: error ? "ERROR" : {itineraries},
            success: error ? false : true,
            error: error
        })
    },//trae todos los itinerarios de la DB (funciona)
    getAllItinerariesInCity: async (req, res) => {
        const idCity = req.params.idCity;
        let itineraries;
        let error = null;

        try {
            itineraries = await Itinerary.find({ idCity: idCity });
        } catch (err) {
            error = err;
        }

        res.json({
            response: error ? "ERROR" : itineraries,
            success: error ? false : true,
            error: error
        });
    },// trae todos los itinerarios de una ciudad ()
    getOneItinerary: async (req, res) => {
        let id = req.params.id
        let itinerary
        let error = null

        try {
            itinerary = await Itinerary.findOne({ _id: id })
        } catch (err) { error = err }
        res.json({
            response: error ? "No matches found in database" : itinerary,
            success: error ? false : true,
            error: error
        })
    }, //trae un solo itinerario (funciona) 
    modifyItinerary: async (req, res) => {
        const id = req.params.id
        const data = req.body.data

        let itinerary
        let error = null

        try {
            itinerary = await Itinerary.findOneAndUpdate({ _id: id }, data, { new: true })
        } catch (err) { error = err }
        res.json({
            response: error ? "There are no matches with the entered ID" : itinerary,
            success: error ? false : true,
            error: error
        })
    },//modifica un itinerario
    addOneItinerary: async (req, res) => {
    const {collaborator, profileImage, imageItineraryA, imageItineraryB, imageItineraryC, titleActivity, description, price, time, hashtag, idCity, likes} = req.body.data
    let itinerary
    let error = null

    try {
        let verifyItineraryExist = await Itinerary.find({titleActivity: {$regex: titleActivity, $options: 'i' }})
        if(verifyItineraryExist.length == 0){
            itinerary = await new Itinerary({
            collaborator: collaborator,
            profileImage: profileImage,
            imageItineraryA: imageItineraryA,
            imageItineraryB: imageItineraryB,
            imageItineraryC: imageItineraryC,
            titleActivity: titleActivity,
            description:description,
            price: price,
            time: time,
            hashtag: hashtag,
            idCity: idCity,
            likes: likes,
        }).save()
        }else{
            error = "This itinerary already exists in the database " + verifyItineraryExist[0]._id
        }

    } catch (err) { error = err }
    res.json({
        response: error ? "Failed to add object to database" : itinerary,
        success: error ? false : true,
        error: error
    })
    }, //agregar un itinerario a la vez (funciona)
    addMultiplesItineraries: async (req, res) => {
        let error = [];
        let itineraries = [];
      
        try {
          for (let itinerary of req.body.data) {
            let verifyItineraries = await Itinerary.find({ titleActivity: { $regex: itinerary.titleActivity, $options: 'i' } });
            if (verifyItineraries.length === 0) {
              let dataItinerary = {
                collaborator: itinerary.collaborator,
                profileImage: itinerary.profileImage,
                imageItineraryA: itinerary.imageItineraryA,
                imageItineraryB: itinerary.imageItineraryB,
                imageItineraryC: itinerary.imageItineraryC,
                titleActivity: itinerary.titleActivity,
                description: itinerary.description,
                price: itinerary.price,
                time: itinerary.time,
                hashtag: itinerary.hashtag,
                idCity: itinerary.idCity,
                likes: itinerary.likes,
                language: itinerary.language,
                years: itinerary.years
              };
              await new Itinerary(dataItinerary).save();
              itineraries.push(dataItinerary);
            } else {
              error.push({
                titleActivity: itinerary.titleActivity,
                result: "The ID already exists in the DB: " + verifyItineraries[0]._id
              });
            }
          }
        } catch (err) {
          error = [err];
        }
        
        res.json({
          response: error.length > 0 || itineraries.length === 0 ? "ERROR" : itineraries,
          success: error.length > 0 ? (itineraries.length > 0 ? "warning" : false) : true,
          error: error
        });
removeItinerary: async (req, res) => {
        let id = req.params.id
        let itinerary
        let error = null

        try {
            itinerary = await Itinerary.findOneAndDelete({ _id: id })
        } catch (err) { error = err }
        res.json({
            response: error ? "The ID does not match any object in the database" : itinerary,
            success: error ? false : true,
            error: error
        })
    }, // elimina un itinerario por vez (funciona)
    //removeManyItineraries: () => { },

    removeManyItinerary: async (req, res) => {
        const data = req.body.data
        let itinerariesDelete = []
        let error = []

        try {
            let itinerary
            for (let id of data) {
                itinerary = await itineraries.findOneAndDelete({ _id: id })
                if (itinerary) {
                    itinerariesDelete.push(itinerary)
                } else {
                    error.push({
                        id: id,
                        error: "the ID you want to delete was not found"
                    })
                }
            }
        } catch (err) { error = err }

        res.json({
            response: error.length > 0 && itinerariesDelete.length === 0 ? "ERROR" : itinerariesDelete,
            success: error.length > 0 ? (itinerariesDelete.length > 0 ? "warning" : false) : true,
            error: error
        })
    }
}

module.exports = itinerariesControllers