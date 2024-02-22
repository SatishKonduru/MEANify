const mongoose = require('mongoose');
const {Product} = require('./product')
const orderItemSchema = new mongoose.Schema({
   id: String,
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product' 
    },
    quantity: Number
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema,'orderItems');

module.exports = { OrderItem : OrderItem };