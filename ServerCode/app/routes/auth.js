const express = require('express');
const passport = require('passport');

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

module.exports = router;
