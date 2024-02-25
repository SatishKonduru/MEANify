require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const bodyParser =  require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const productRoute = require('./routes/products')
const userRoute = require('./routes/users')
const orderRoute = require('./routes/orders')
const categoryRoute = require('./routes/categories')
const AuthJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')

const PORT = process.env.PORT
const api = process.env.API_URL
const app =  express()

app.use(express.json() )
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('tiny'))
app.use(cors())
app.options('*', cors())
app.use(AuthJwt())
app.use(errorHandler)

app.use('/public/uploads', express.static(__dirname+'/public/uploads'))

mongoose.connect(process.env.CONNECTION_STRING, {dbName: process.env.DB_NAME}).then(() => {
    console.log("Database Connected")
})
.catch(()=>{
    console.log("DB Connection Fail...")
})


app.listen(PORT, ()=> {
    console.log(api)
    console.log("Server Listening at Port: ", PORT)
})

//to Check in Browser with localhost:3000
app.get('/', (req, res) => {
    res.status(200).json({message: "OK"})
})


app.use(`${api}/products`, productRoute)
app.use(`${api}/users`, userRoute)
app.use(`${api}/orders`, orderRoute)
app.use(`${api}/categories`, categoryRoute)