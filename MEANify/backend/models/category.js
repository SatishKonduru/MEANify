const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
   id: String,
   name: {type: String, required: true},
   color: {type: String},
   icon: {type: String},
   image: {type: String, default: ''}
});

const Category = mongoose.model('Category', categorySchema,'categories');

module.exports = { Category : Category };