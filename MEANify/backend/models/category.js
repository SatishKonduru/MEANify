const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
   
   name: {type: String, required: true},
   color: {type: String},
   icon: {type: String},
   image: {type: String, default: ''}
});
categorySchema.virtual('id').get(function () {return this._id.toHexString()})
categorySchema.set('toJSON', {virtuals: true})
const Category = mongoose.model('Category', categorySchema,'categories');

module.exports = { Category : Category };