const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../models/userModel');

const router = new express.Router();

router.post('/signup', (req, res, next) => {
    return passport.authenticate('local-signup', (err, token, userData) => {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // the 11000 Mongo code is for a duplication email error
                // the 409 HTTP status code is for conflict error
                return res.status(409).json({
                    success: false,
                    message: 'Check the form for errors.',
                    errors: {
                        email: 'This email is already taken.'
                    }
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'You have successfully signed up! Now you should be able to log in.',
            token,
            user: userData
        });
    })(req, res, next);
});

router.post('/loginuser', (req, res, next) => {
    return passport.authenticate('local-login-user', (err, token, userData) => {
        if (err) {
            if (err.name === 'IncorrectCredentialsError') {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }


        return res.json({
            success: true,
            message: 'You have successfully logged in!',
            token,
            user: userData
        });
    })(req, res, next);
});

router.post('/loginorg', (req, res, next) => {
    return passport.authenticate('local-login-org', (err, token, orgData) => {
        if (err) {
            if (err.name === 'IncorrectCredentialsError') {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Could not process the form.'
            });
        }


        return res.json({
            success: true,
            message: 'You have successfully logged in!',
            token,
            org: orgData
        });
    })(req, res, next);
});


router.get('/facebookLogin', passport.authenticate('facebook-login', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
router.get('/facebookLogin/callback',
        passport.authenticate('facebook-login', {
            session : false,
            //successRedirect : '/?itworked=2',
            failureRedirect : '/'
        })

        ,function(req, res) {
            const payload = {
                        sub: req.user.id
                    };

                    // Create a token string
                    const token2 = jwt.sign(payload, config.jwtSecret);
                    
            if(req.user.email!=null){
                var myId = 0
                
                User.findOne({email: req.user.email}).then(function(user){                    
                     myId = user._id                     
                res.redirect('/?email='+req.user.email+'&firstName='+req.user.firstName+'&lastName='+req.user.lastName+'&jwt='+token2+'&id='+myId+'&facebookStuff=')
                });
                
                 
            } else{
                res.redirect('/')
            }
        }
        );

module.exports = router;
