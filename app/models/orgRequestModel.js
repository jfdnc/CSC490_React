var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

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
    orgWebsite: String,
    orgContactPerson: String,
    orgPwHash: String,
    orgVolOps: [mongoose.Schema.ObjectId]
});

// Generate hash
orgRequestSchema.pre('save', function saveHook(next) {
    const org = this;

    // used only if the password is modified or the user is new
    if(!org.isModified('orgPwHash')) return next();

    return bcrypt.genSalt((saltError, salt) => {
        if(saltError){ return next(saltError); }

        return bcrypt.hash(org.orgPwHash, salt, (hashError, hash) => {
            if(hashError){ return next(hashError); }

            //replace the password with hash value
            org.orgPwHash = hash;

            return next();
        });
    });
});

module.exports = mongoose.model('OrgRequest', orgRequestSchema);