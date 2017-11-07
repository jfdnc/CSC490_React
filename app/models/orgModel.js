var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Organization schema
var orgSchema = new mongoose.Schema({
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
    orgWebsite: String,
    orgContactPerson: String,
    orgPwHash: String,
    orgVolOps: [mongoose.Schema.ObjectId]
});

// Compare the passed password with the value in the database
orgSchema.methods.comparePassword = function comparePassword(orgPwHash, callback) {
    bcrypt.compare(orgPwHash, this.orgPwHash, callback);
};

module.exports = mongoose.model('Organization', orgSchema);
