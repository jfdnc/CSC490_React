var mongoose = require('mongoose');

var Address = require('./addressModel');
var Organization = require('./orgModel');

// VolOps schema(required fields????)
var volOpSchema = new mongoose.Schema({
    pkey: {type: String, unique: true, index: true},
    org: {
        type: mongoose.Schema.ObjectId, ref: 'Organization'
    },
    volOpName: String,
    volOpDescription: String,
    volOpSpotsAvailable: Number,
    volOpAddress: {
        type: mongoose.Schema.ObjectId, ref: 'Address'
    },
    volOpOngoing: Boolean,
    volOpStartDate: String,
    volOpEndDate: String,
    volOpTod: String,
    volOpDetails: {
        detail1: String,
        detai12: String,
        detail3: String,
        detail4: String,
        detail5: String,
    },
    volOpCategories: {
        category1: String,
        category2: String,
        category3: String,
        category4: String
    }
});

var VolOp = module.exports = mongoose.model('VolOp', volOpSchema);

module.exports.getVolOp = function (callback){

    VolOp.find(callback);
};