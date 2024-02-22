const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
   id: String,
   name: String,
   color: String,
   icon: String,
   image: String
});

const Category = mongoose.model('Category', categorySchema,'categories');

module.exports = { Category : Category };