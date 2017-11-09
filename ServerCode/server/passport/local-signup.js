const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken')
const config = require('../../config')

// Return the passport local strategy object
module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'pwHash',
    session: false,
    passReqToCallback: true
}, (req, email, pwHash, done) => {

    const userData = {
        email: email.trim(),
        pwHash: pwHash.trim(),
        firstName: req.body.firstName.trim(),
        lastName: req.body.lastName.trim(),
        zipCode: req.body.zipCode.trim()
    };

    const newUser = new User(userData);
    return newUser.save((err, user) => {
        if (err){ return done(err); }

        const payload = {
            sub: user._id
        };

        // Create a token string
        const token = jwt.sign(payload, config.jwtSecret);
        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            zipCode: user.zipCode,
            preferences: user.preferences,
            savedVolOps: user.savedVolOps
        };
        return done(null, token, data)
    });
});