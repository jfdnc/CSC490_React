const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VolOp = require('./volOpModel');

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
    pwHash: String,
    preferences: [String],
    savedVolOps: [mongoose.Schema.ObjectId] // store id of users saved volOps
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
