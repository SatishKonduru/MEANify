const mongoose = require('mongoose');
const {User} = require('./user')
const {OrderItem} = require('./orderItem')
const orderSchema = new mongoose.Schema({
   
   orderItems: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'OrderItem',
    required: true
    }],
    shippingAddress1: {type: String, defualt: ''},
    shippingAddress2:{type: String, defualt: ''},
    city: {type: String, defualt: ''},
    zip: {type: String, defualt: ''},
    country: {type: String, defualt: ''},
    phone: {type: String, defualt: ''},
    status:{type: String,  defualt: 'Pending'},
    totalPrice: {type: Number, defualt: 0},
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
        },
    dateOrdered: {type: Date, defualt: Date.now},
});
orderSchema.virtual('id').get(function () {return this._id.toHexString()})
orderSchema.set('toJSON', {virtuals: true})
const Orders = mongoose.model('Orders', orderSchema,'orders');

module.exports = { Orders : Orders };