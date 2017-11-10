const jwt = require('jsonwebtoken');
const Organization = require('mongoose').model('Organization');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');

// Return the passport local strategy object
module.exports = new PassportLocalStrategy({
    usernameField: 'orgEmail',
    passwordField: 'orgPwHash',
    session: false,
    passReqToCallback: true
}, (req, orgEmail, orgPwHash, done) => {
    const orgData = {
        orgEmail: orgEmail.trim(),
        orgPwHash: orgPwHash.trim()
    };

    // Find an org by email address
    return Organization.findOne({ orgEmail: orgData.orgEmail}, (err, org) => {
        if(err){ return done(err); }

        if(!org) {
            const error = new Error('Incorrect email or password');
            error.name = 'IncorrectCredentialsError';

            return done(error);
        }

        // Check if a hashed org's password is equal to the value in the database
        return org.comparePassword(orgData.orgPwHash, (passwordErr, isMatch) => {
            if(passwordErr){ return done(passwordErr); }

            if(!isMatch){
                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';

                return done(error);
            }

            const payload = {
                sub: org._id
            };

            // Create a token string
            const token = jwt.sign(payload, config.jwtSecret);
            const data = {
                _id: org._id,
                orgName: org.orgName,
                orgAddress: {
                    street: org.orgAddress.street,
                    city: org.orgAddress.city,
                    state: org.orgAddress.state,
                    zip: org.orgAddress.zip
                },
                orgDescription: org.orgDescription,
                orgPhone: org.orgPhone,
                orgWebsite: org.orgWebsite,
                orgContactPerson: org.orgContactPerson,
                orgVolOps: org.orgVolOps
            };
            return done(null, token, data);
        });
    });
});