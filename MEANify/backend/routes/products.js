const express = require('express')
const router = express.Router()
const  { Product } = require('../models/product')

router.post(`/`, (req, res) => {
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


router.get(`/`, async(req, res) => {
    const productList = await Product.find();
    if(!productList){
        res.status(500).json({
            message: 'No Products found.',
            success: false
        })
    }
    else
    // res.status(200).json(productList)  (or)
    res.status(200).send(productList)
                    // (OR)
    // const productList = Product.find()
    //                     .then(p => {
    //                         res.status(200).send(p)
    //                     })
                       
    
})


module.exports = router