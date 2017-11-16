const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
//const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');

var TwitterStrategy  = require('passport-twitter').Strategy;

// load up the user model
//var User       = require('../../app/models/userModel');

// load the auth variables
var configAuth = require('./authSocial');

// Return the passport local strategy object
module.exports = new TwitterStrategy({

	 	consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL

    },
    function(token, tokenSecret, profile, done) {

        // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function() {

            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    var newUser                 = new User();

                    // set all of the user data that we need
                    newUser.twitter.id          = profile.id;
                    newUser.twitter.token       = token;
                    newUser.twitter.username    = profile.username;
                    newUser.twitter.displayName = profile.displayName;

                    var str = profile.displayName.split(" ")
                    newUser.firstName = str[0]
                    newUser.lastName = str[1]
                    newUser.email = profile.username+'@updateMe.com'
                   

                    // save our user into the database
                    
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                    
                }
            });

    });

    });