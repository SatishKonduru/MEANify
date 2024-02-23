const mongoose = require('mongoose');
const {Product} = require('./product')
const orderItemSchema = new mongoose.Schema({
  
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product' 
    },
    quantity: Number
});
orderItemSchema.virtual('id').get(function () {return this._id.toHexString()})
orderItemSchema.set('toJSON', {virtuals: true})
const OrderItem = mongoose.model('OrderItem', orderItemSchema,'orderItems');

module.exports = { OrderItem : OrderItem };