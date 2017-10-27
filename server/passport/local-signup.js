const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

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
    newUser.save((err) => {
        if (err){ return done(err); }

        return done(null);
    });
});