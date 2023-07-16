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
    let itineraries = [];
    error = [];

    try{
        for (let Itinerary of req.body.data) {
            let verifyItineraries = await Itinerary.find({titleActivity: {$regex: Itinerary.titleActivity, $options: 'i'}})
            if (verifyItineraries.length==0){
                let dataItineraries = 
                {
                    collaborator: Itinerary.collaborator,
                    profileImage: Itinerary.profileImage,
                    imageItineraryA: Itinerary.imageItineraryA,
                    imageItineraryB: Itinerary.imageItineraryB,
                    imageItineraryC: Itinerary.imageItineraryC,
                    titleActivity: Itinerary.titleActivity,
                    description: Itinerary.description,
                    price: Itinerary.price,
                    time: Itinerary.time,
                    hashtag: Itinerary.hashtag,
                    idCity: Itinerary.idCity,
                    likes: Itinerary.likes,
                    language: Itinerary.language,
                    years: Itinerary.years
                }
                await new Itinerary({
                    ...dataItineraries
                }) .save() 
              itineraries.push(dataItineraries)
            }
            else {
                error.push({
                    titleActivity: Itinerary.titleActivity,
                    resul: "the ID already exists in the DB: " + verifyItineraries[0]._id
                })
            }
        }
    } 
    catch (err) { error = err }
        res.json({
            response: error.length > 0 && itineraries.length === 0 ? "ERROR" : itineraries,
            success: error.length > 0 ? (itineraries.length > 0 ? "warning" : false) : true,
            error: error
        })
    },
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
}

module.exports = itinerariesControllers