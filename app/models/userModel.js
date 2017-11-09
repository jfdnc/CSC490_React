const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VolOp = require('./volOpModel');
const bcrypt = require('bcrypt');

// create user schema and model
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    zipCode: Number,
    email: {
      type: String,
      required: [true, 'user.email field is required'],
      unique: true
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    pwHash: String,
    preferences: [String],
    savedVolOps: [String] // store id of volOp
});

// Compare the passed password with the value in the database
UserSchema.methods.comparePassword = function comparePassword(pwHash, callback) {
    bcrypt.compare(pwHash, this.pwHash, callback);
};

// Generate hash
UserSchema.pre('save', function saveHook(next) {
    const user = this;

    // used only if the password is modified or the user is new
    if(!user.isModified('pwHash')) return next();

    return bcrypt.genSalt((saltError, salt) => {
        if(saltError){ return next(saltError); }

        return bcrypt.hash(user.pwHash, salt, (hashError, hash) => {
            if(hashError){ return next(hashError); }

            //replace the password with hash value
            user.pwHash = hash;

            return next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);
