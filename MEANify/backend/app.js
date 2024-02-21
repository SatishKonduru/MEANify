const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const bodyParser =  require('body-parser')
const PORT = process.env.PORT
const api = process.env.API_URL
const app =  express()
// app.use(express.json() )
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.listen(PORT, ()=> {
    console.log(api)
    console.log("Server Listening at Port: ", PORT)
})

//to Check in Browser with localhost:3000
app.get('/', (req, res) => {
    res.status(200).send({message: "OK"})
})