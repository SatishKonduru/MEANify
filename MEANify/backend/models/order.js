const mongoose = require('mongoose');
const {User} = require('./user')
const {OrderItem} = require('./orderItem')
const orderSchema = new mongoose.Schema({
   id: String,
   orderItems: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'OrderItem' 
    }],
    shippingAddress1: String,
    shippingAddress2: String,
    city: String,
    zip: String,
    country: String,
    phone: String,
    status: String,
    totalPrice: Number,
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
        },
    dateOrdered: Date
});

const Orders = mongoose.model('Orders', orderSchema,'orders');

module.exports = { Orders : Orders };