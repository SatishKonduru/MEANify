const mongoose = require('mongoose')
const { Category } = require('./category')

const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    richDescription: String,
    image: String,
    images: [String],
    brand: String,
    price: Number,
    category: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Category' 
            },
    countInStock: Number,
    rating: Number,
    isFeatured: Boolean,
    dateCreated: Date

})
const Product = mongoose.model('Product', productSchema,'products')
module.exports =  { Product : Product}  ;