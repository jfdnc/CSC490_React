const express = require('express');
const gmap = require('googlemaps');
const parser = require('parse-address');
const router = express.Router();
const VolOp = require('../models/volOpModel');

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
    console.log(volOp)
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
    var fullAddress = `${street.slice(2)},${city},${state},${zip}`
    var imgTag = `<img src="https://maps.googleapis.com/maps/api/staticmap?center=${fullAddress}&zoom=14&size=300x300&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C${fullAddress}&key=${gmapsapikey}"`
    var clickableMap = `
      <a href="https://www.google.com/maps/dir/${fullAddress}">
        ${imgTag}
      </a>
      `
    //var parsedStr = parseString("High Point");
    res.send(clickableMap);
  });
});

module.exports = router;
