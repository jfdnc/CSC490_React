var mongoose = require('mongoose');

var VolOp = require('./volOpModel');

// User schema (required fields????)
var userSchema = new mongoose.Schema({
    pkey: {type: String, unique: true},
    first_name: String,
    last_name: String,
    zipCode: Number,
    email: {type: String, unique: true, index: true},
    pwHash: String,
    preferences: {
        category1: String, //to match volOpCategories
        category2: String,
        category3: String,
        category4: String
    },
    savedVolOps: {
        type: mongoose.Schema.ObjectId, ref: 'VolOp'
    }
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.getUser = function (callback){

    User.find(callback);
};
