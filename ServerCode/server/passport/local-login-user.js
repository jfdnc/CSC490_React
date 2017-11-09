const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');

// Return the passport local strategy object
module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'pwHash',
    session: false,
    passReqToCallback: true
}, (req, email, pwHash, done) => {
    const userData = {
        email: email.trim(),
        pwHash: pwHash.trim()
    };

    // Find a user by email address
    return User.findOne({ email: userData.email}, (err, user) => {
        if(err){ return done(err); }

        if(!user) {
            const error = new Error('Incorrect email or password');
            error.name = 'IncorrectCredentialsError';

            return done(error);
        }

        // Check if a hashed user's password is equal to the value in the database
        return user.comparePassword(userData.pwHash, (passwordErr, isMatch) => {
            if(passwordErr){ return done(passwordErr); }

            if(!isMatch){
                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';

                return done(error);
            }

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
            return done(null, token, data);
        });
    });
});
