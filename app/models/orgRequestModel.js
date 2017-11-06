var mongoose = require('mongoose');
var Address = require('./addressModel');

// Organization schema
var orgRequestSchema = new mongoose.Schema({
    orgName: String,
    orgAddress: {
        street: {
            type: String,
            required: [true, 'organization.orgAddress.street field is required']
        },
        city: {
            type: String,
            required: [true, 'organization.orgAddress.city field is required']
        },
        state: {
            type: String,
            required: [true, 'organization.orgAddress.state field is required']
        },
        zip: {
            type: String,
            required: [true, 'organization.orgAddress.zip field required']
        }},
    orgDescription: String,
    orgPhone: String,
    orgEmail: String,
    orgContactPerson: String,
    orgVolOps: [mongoose.Schema.ObjectId]
});

module.exports = mongoose.model('OrgRequest', orgRequestSchema);