var mongoose = require('mongoose');

// Address schema
var addressSchema = new mongoose.Schema({
    pkey: {type: String, unique: true, index: true},
    street: String,
    city: String,
    state: String,
    zipCode: Number
});

var Address = module.exports = mongoose.model('Address', addressSchema);