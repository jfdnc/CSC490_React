var mongoose = require('mongoose');

var User = require('./userModel');
var VolOp = require('./volOpModel');

//Global object schema
var globalSchema = new mongoose.Schema({
    volOps: {
        type: mongoose.Schema.ObjectId, ref: 'VolOp'
    },
    user: {
        type: mongoose.Schema.ObjectId, ref: 'User'
    }
});

var Global = module.exports = mongoose.model('Global', globalSchema);