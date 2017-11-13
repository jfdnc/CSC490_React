const express = require('express');
const gmap = require('googlemaps');
const parser = require('parse-address');
const router = express.Router();
const User = require('../models/userModel');
const VolOp = require('../models/volOpModel');

// ---Retrieve static map of volOp address---
router.get('/volOps/:id', function(req, res, next){
  VolOp.findById({_id: req.params.id}).then(function(volOp){
    var parsed = parser.parseLocation(volOp.volOpAddress.street);
    var number = parsed.number;
    var prefix = parsed.prefix;
    var street = parsed.street;
    var city = volOp.volOpAddress.city;
    var state = volOp.volOpAddress.state;
    var zip = volOp.volOpAddress.zip;
    var fullAddress = number + "+" + prefix + "+" + street + "+" + city + "+" + state;
    var addressAndParams = fullAddress + "&zoom=13&scale=1&size=300x300&maptype=roadmap&format=png&visual_refresh=true";
    var clickableMap = "<a href=\"https://www.google.com/maps/dir/" + fullAddress + "\/\"><img src=\"https://maps.googleapis.com/maps/api/staticmap?center=" + addressAndParams + "\"" + "alt=\"Google Map of" + fullAddress + "\/></a>"
    res.send(clickableMap);
  });
});

module.exports = router;
