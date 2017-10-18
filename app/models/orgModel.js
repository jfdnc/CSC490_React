var mongoose = require('mongoose');
var Address = require('./addressModel');

// Organization schema
var orgSchema = new mongoose.Schema({
    pkey: {type: String, unique: true, index: true},
    orgName: String,
    orgAddress: {
        type: mongoose.Schema.ObjectId, ref: 'Address'
    },
    orgDescription: String,
    orgPhone: String,
    orgEmail: String,
    orgContactPerson: String
});

var Organization = module.exports = mongoose.model('Organization', orgSchema);

module.exports.getOrg = function (callback){

    Organization.find(callback);
};