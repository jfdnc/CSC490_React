var mongoose = require('mongoose');

var Address = require('./addressModel');
var Organization = require('./orgModel');

// VolOps schema(required fields????)
var volOpSchema = new mongoose.Schema({
    orgName: {
        type: String,
        required: [true, 'volOp.orgName field required']
    },
    volOpName: String,
    volOpDescription: String,
    volOpSpotsAvailable: Number,
    savedUsers: [String],
    volOpAddress: {
      street: {
        type: String,
        required: [true, 'volOp.volOpAddress.street field is required']
      },
      city: {
        type: String,
        required: [true, 'volOp.volOpAddress.city field is required']
      },
      state: {
        type: String,
        required: [true, 'volOp.volOpAddress.state field is required']
    },
    zip: {
      type: String,
      required: [true, 'volOp.volOpAddress.zip field required']
    }
  },
    volOpOngoing: Boolean,
    volOpStartDate: String,
    volOpEndDate: String,
    volOpTod: String,
    volOpDetails: [String],
    volOpCategories: [String]
});

var VolOp = module.exports = mongoose.model('VolOp', volOpSchema);

module.exports = VolOp;
