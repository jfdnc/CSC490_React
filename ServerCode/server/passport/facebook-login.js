const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
//const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');

var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
//var User       = require('../../app/models/userModel');

// load the auth variables
var configAuth = require('./authSocial');

// Return the passport local strategy object
module.exports = new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields:['id','name','emails']

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)                    
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();
                    console.log(profile)

                    // set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.email=newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    newUser.firstName =  profile.name.givenName
                    newUser.lastName = profile.name.familyName
                    // save our user to the database
                    newUser.save(function(err) {
                        if (err){
                            if(err.name=='insertDocument '){
                                console.log('update user, dont add duplicate')
                            }
                            throw err;
                        }

                        const payload = {
                        sub: newUser.facebook.id
                    };

                    //START
                    //the following code should be used with a HTTP request, however, at present we are sending data through the URL
                    //when the facebook callback redirects the user
                    // Create a token string
                    const token2 = jwt.sign(payload, config.jwtSecret);
                    const data = {
                        user: {
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        email: newUser.email
                    },
                        token: token2

                    };
                    //console.log(token2)

                    return done(null, data);
                    //END -- Still need to a return value
                    });
                    
                }

            });
        });

    });
