const express = require('express');
const validator = require('validator');
const passport = require('passport');
const bodyParser = require('body-parser');

const router = new express.Router();

// Validate the signup form
function validateSignupForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }
/*
    if (!payload || typeof payload.pwHash !== 'string' || payload.pwHash.trim().length < 8) {
        isFormValid = false;
        errors.pwHash = 'Password must have at least 8 characters.';
    }
*/
    if (!payload || typeof payload.firstName !== 'string' || payload.firstName.trim().length === 0) {
        isFormValid = false;
        errors.firstName = 'Please provide your first name.';
    }

    if (!payload || typeof payload.lastName !== 'string' || payload.lastName.trim().length === 0) {
        isFormValid = false;
        errors.lastName = 'Please provide your last name.';
    }
/*
    if (!payload || typeof payload.zipCode !== 'number' || payload.zipCode.trim().length === 0) {
        isFormValid = false;
        errors.zipCode = 'Please provide your zip code.';
    }
*/
    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

// Validate the User login form
function validateUserLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Please provide your email address.';
    }

    if (!payload || typeof payload.pwHash !== 'string' || payload.pwHash.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

// Validate the Org login form
function validateOrgLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.orgEmail !== 'string' || payload.orgEmail.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Please provide your email address.';
    }

    if (!payload || typeof payload.orgPwHash !== 'string' || payload.orgPwHash.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

router.post('/signup', (req, res, next) => {
    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }


    return passport.authenticate('local-signup', (err) => {
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
        });
    })(req, res, next);
});

router.post('/loginuser', (req, res, next) => {
    const validationResult = validateUserLoginForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }


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
    const validationResult = validateOrgLoginForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }


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