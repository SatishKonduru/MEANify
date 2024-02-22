const express = require('express')
const router = express.Router()
const  { Product } = require('../models/product')
const mongoose = require('mongoose')

router.post(`/`, async(req, res) => {
    const data = req.body
    const product = new Product({
    name: data.name,
    description: data.description,
    richDescription: data.richDescription,
    image: data.image,
    brand: data.brand,
    price: data.price, 
    category: data.category,
    countInStock: data.countInStock,
    rating: data.rating,
    isFeatured: data.isFeatured
    })
    savedProduct = await product.save()
    if(!savedProduct){
        res.status(401).json({
            message: 'Product Not Saved',
            success: false
        })
    }
    else{
        res.status(200).json({
            message: "Product Saved Successfully",
            success: true
        })
    }      

})


router.get(`/`, async(req, res) => {
    const productList = await Product.find().select('name description price -_id');
    if(!productList){
        res.status(500).json({
            message: 'No Products were found.',
            success: false
        })
    }
    else
       res.status(200).send(productList)
    
})


router.get(`/:id`, async (req, res) => {
    const id = req.params.id
    resultProduct = await Product.findById(id).populate('category')
    if(!resultProduct){
        res.status(401).json({
            message: 'No Product was Found',
            success: false
        })
    }
    else{
        res.status(200).send(resultProduct)
    }
})

router.patch(`/:id`, async (req, res) => {
    const id = req.params.id
    const data = req.body
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({
            message: 'Invalid Object Id'
        })
    }
    updatedProduct = await Product.findByIdAndUpdate(id, { name : data.name}, {new: true})
    if(!updatedProduct){
        res.status(401).json({
            message: 'Invalid Product Selection',
            success: false
        })
    }
    else{
        res.status(200).json({
            message: 'Product Updated Successfully',
            success: true
        })
    }
})

router.delete(`/:id`, async (req, res) => {
    const id = req.params.id
    deletedProduct = await Product.findByIdAndDelete(id)
    if(!deletedProduct){
        res.status(400).json({
            message: 'No Product was found',
            success: false

        })
    }
    else{
        res.status(200).json({
            message: 'Product Deleted Succesfully',
            success: true
        })
    }
})


module.exports = router