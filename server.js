const express = require("express")
const cors = require('cors')
require("dotenv").config()
require("./config/databaseItinerary")
const Routes = require("./routes/routes.js")

const app = express()

const PORT = process.env.PORT || 4000
// va a levantar en el puerto declarado en la variable de ambiente
app.set("port", PORT) 

app.use(cors())

app.use(express.json())
//estamos pidiendo la respuesta en formato json
app.use("/api", Routes)

app.listen(PORT, ()=>{
    console.log("SERVIDOR CORRIENDO EN EL PUERTO " + app.get("port"))
})