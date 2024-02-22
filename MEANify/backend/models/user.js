const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   id: String,
   name: String,
   email: String,
   passwordHash: String,
   street: String,
   apartment: String,
   city: String,
   zip: String,
   country: String,
   phone: String,
   isAdmin: Boolean
});

const User = mongoose.model('User', userSchema,'users');

module.exports = { User : User };