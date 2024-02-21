require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const bodyParser =  require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT
const api = process.env.API_URL
const app =  express()

// app.use(express.json() )
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('tiny'))
app.use(cors())

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

//Products
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number
})
const Product = mongoose.model('product', productSchema)

app.post(`${api}/products`, (req, res) => {
    const data = req.body
    const product = new Product({
        name: data.name,
        image: data.image,
        countInStock: data.countInStock
    })
    product.save()
            .then((createdProduct) => {
              res.status(200).json(createdProduct)
            })
            .catch((err) => {
                res.status(500).json({
                    error: err,
                    success: false
                })
            })

})