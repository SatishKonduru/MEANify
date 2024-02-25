const express = require('express')
const router = express.Router()
const  { Product } = require('../models/product')
const mongoose = require('mongoose')
const product = require('../models/product')
const multer = require('multer')
const { Category } = require('../models/category')


const FILE_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg'
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype]
        let uploadError = new Error('Invalid Image Type')
        if(isValid){
            uploadError = null
        }
      cb(uploadError , 'public/uploads')
    },
    filename: function (req, file, cb) { 
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileName = file.originalname.split(' ').join('-')
      const extension = FILE_TYPE_MAP[file.mimetype]
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  
 const uploadOptions = multer({ storage: storage })

router.post(`/`, uploadOptions.single('image') ,async(req, res) => {
    const data = req.body
    const file = req.file
    if(!file){
        return res.status(400).send('No Image was found in Request')
    }
    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/` 
    // basePath = http://localhost:3000/public/upload
    const product = new Product({
    name: data.name,
    description: data.description,
    richDescription: data.richDescription,
    image: `${basePath}${fileName}`,
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
            success: true,
            newProduct: savedProduct
        })
    }      

})


// router.get(`/`, async(req, res) => {
//     // const productList = await Product.find().select('name description price -_id');
//     const productList = await Product.find()
//     if(!productList){
//         res.status(500).json({
//             message: 'No Products were found.',
//             success: false
//         })
//     }
//     else
//        res.status(200).send(productList)
    
// })


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

    const category = await Category.findById(data.category)
    if(!category) return res.status(400).send("Invalid Category")

    const product  =  await Product.findById(id)
    if(!product) return res.status(400).send('Invalid Product')

    const file = req.file
    let imagePath;
    if(file){
        const fileName = req.file.filename
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/` 
        imagePath = `${basePath}${fileName}`
    }
    else{
        imagePath = product.image
    }

    updatedProduct = await Product.findByIdAndUpdate(id, { image : imagePath}, {new: true})
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


router.get(`/get/count`, async (req, res) => {
    const productCount = await Product.countDocuments()
    if(!productCount){
        res.status(400).json({
            message: 'No Products were found',
            success: false
        })
    }
    else{
        res.status(200).send({
            totalCount: productCount
        })
    }
})

router.get(`/get/featured`, async (req, res) => {
    featuredProducts = await Product.find({isFeatured: true})
    if(!featuredProducts){
        res.status(401).json({
            message: "No Featured Products were Found",
            success: false
        })
    }
    else{
        res.status(200).send(featuredProducts)
    }
})

router.get(`/get/featured/:count`, async (req, res) => {
    const number = req.params.count ? req.params.count : 0
    featuredProducts = await Product.find({isFeatured: true}).limit(+number)
    if(!featuredProducts){
        res.status(401).json({
            message: "No Featured Products were Found",
            success: false
        })
    }
    else{
        res.status(200).send(featuredProducts)
    }
})

router.get(`/`, async (req, res) => {
    const categories = req.query.category
    let filter = {}
    if(categories){
        filter = {category: categories.split(',')}
    }
    const productsByCategory = await Product.find(filter)
    if(productsByCategory.length <= 0){
        res.status(400).send({
            message: 'No Products were found under given Category',
            success: false
        })
    }
    else{
        res.status(200).send(productsByCategory)
    }
})

router.patch(`/gallery-images/:id`, uploadOptions.array('images', 10), async (req, res) =>{
    const id= req.params.id
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({
            message: 'Invalid Object Id'
        })
    }
    
    const product  =  await Product.findById(id)
    if(!product) return res.status(400).send('Invalid Product')

    let imagePaths=[];
    const files = req.files
  
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/` 
    if(files){
        files.map(file => {
            imagePaths.push(`${basePath}${file.filename}`)
        })
    }
    

    updatedProduct = await Product.findByIdAndUpdate(id, { images : imagePaths}, {new: true})
    if(!updatedProduct){
        res.status(401).json({
            message: 'Invalid Product Selection',
            success: false
        })
    }
    else{
        res.status(200).send({
            message: 'Product Updated Successfully with Image Gallery. ',
            success: true,
            updatedProduct: updatedProduct
        })
    }

})

module.exports = router