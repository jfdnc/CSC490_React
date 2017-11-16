const express = require('express');
const gmap = require('googlemaps');
const parser = require('parse-address');
const router = express.Router();
const VolOp = require('../models/volOpModel');
const googlemapsAPIkey = 'AIzaSyD3TJgKgvbdS5bQbM3Qd41DmEwB-W_3nRU'

// Helper function for compound street and city names
function parseString(input){
  var str = input;
  var strArray = str.split(' ');
  var arrayLength = strArray.length;
  var parsedStr = strArray[0];
  for(var i = 1; i < arrayLength; i++){
    parsedStr += "+" + strArray[i];
  }
  return parsedStr;
}

// ---Retrieve static map of volOp address---
router.get('/volOps/:id', function(req, res, next){
  VolOp.findById({_id: req.params.id}).then(function(volOp){
    var parsed = parser.parseLocation(volOp.volOpAddress.street);
    var number = parsed.number;
    if(typeof prefix === 'undefined'){
      prefix = "";
    }
    else{
      prefix = "+" + parsed.prefix;
    }
    var street = parseString(parsed.street);
    var city = parseString(volOp.volOpAddress.city);
    var state = volOp.volOpAddress.state;
    var zip = volOp.volOpAddress.zip;
    var fullAddress = number + prefix + "+" + street + "+" + city + "+" + state;
    var marker = "&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C" + fullAddress + "\"";
    var addressAndParams = fullAddress + "&zoom=14&scale=1&size=300x300&maptype=roadmap&key=" + googlemapsAPIkey + "&format=png&visual_refresh=true" + marker + "\"";
    var clickableMap = "<a href=\"https://www.google.com/maps/dir/" + fullAddress + "\/\"><img src=\"https://maps.googleapis.com/maps/api/staticmap?center=" + addressAndParams + "\"" + "alt=\"Google Map of" + fullAddress + "\/></a>"
    //var parsedStr = parseString("High Point");
    res.send(clickableMap);
  });
});

module.exports = router;
