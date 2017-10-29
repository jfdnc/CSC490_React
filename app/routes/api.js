const express = require('express');
const router = express.Router();
const Address = require('../models/addressModel');
const Organization = require('../models/orgModel');
const User = require('../models/userModel');
const VolOp = require('../models/volOpModel');

//for email event
const ical = require('../util/my-ical-generator');
const nodemailer = require('nodemailer');
const path = require('path');


// ---ORGANIZATION---
//get a list of organizations from the db
router.get('/organizations', function(req, res, next){
  Organization.findOne().then(function(organization){
    res.send({organization});
  });
});

// get a specific organization from the db using orgEmail as key
router.get('/organizations/:email', function(req, res, next){
    Organization.findOne({orgEmail: req.params.email}).then(function(organization){
      res.send({organization});
    });
});

// add a new organization to the db
router.post('/organizations', function(req, res, next){
    Organization.create(req.body).then(function(organization){
        res.send(organization);
    }).catch(next);
});

// update an organization in the db
router.put('/organizations/:id', function(req, res, next){
    Organization.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Organization.findOne({_id: req.params.id}).then(function(organization){
            res.send({organization});
        });
    });
});

// delete an address from the db
router.delete('/organizations/:id', function(req, res, next){
    Organization.findByIdAndRemove({_id: req.params.id}).then(function(address){
        res.send(organization);
    });
    res.send({type: 'DELETE'});
});

// ---USER---

// get a list of all users from the db
router.get('/users', function(req, res, next){
  User.find().then(function(user){
      var allUsers = user.map(user => {
          return { firstName: user.firstName, lastName: user.lastName, email: user.email }
      })
    res.send(allUsers);
  });
});

// get a specific user from the db using email as key
router.get('/users/:email', function(req, res, next){
    User.findOne({email: req.params.email}).then(function(user){
        res.send(user);
    });
});

// update a user in the db
router.put('/users/:id', function(req, res, next){
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        User.findOne({_id: req.params.id}).then(function(user){
            res.send(user);
        });
    });
});

/*
// add volOp to user profile
router.put('users/:userId/:volOpId', function(req, res, next){
  VolOp.findOne({_id: req.params.volOpId}.then(function(savedVolOp){
    User.update({_id: req.params.id},
    {$push: {'savedVolOps': savedVolOp}, {upsert: true}, function(){
      User.findOne({_id: req.params.id}.then(function(user){
        res.send(user);
      }));
    }});
  }));
});
*/

// delete a user from the db
router.delete('/users/:id', function(req, res, next){
    User.findByIdAndRemove({_id: req.params.id}).then(function(user){
        res.send(user);
    });
    res.send({type: 'DELETE'});
});

// ---VOLOP---
// get a list of all volOps from the db
router.get('/volOps/', function(req, res, next){
    VolOp.find().then(function(volOp){
      res.send(volOp);
    });
});

// get a specific volOp from the db
router.get('/volOps/:id', function(res, req, next){
  VolOp.findOne({_id: req.params.id}).then(function(volOp){
    res.send(volOp);
  });
});

// add a new volOp to the db
router.post('/volOps', function(req, res, next){
    VolOp.create(req.body).then(function(volOp){
        res.send(volOp);
    }).catch(next);
});

// update a volOp in the db
router.put('/volOps/:id', function(req, res, next){
    VolOp.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        VolOp.findOne({_id: req.params.id}).then(function(volOp){
            res.send({volOp});
        });
    });
});

// delete a volOp from the db
router.delete('/volOps/:id', function(req, res, next){
    VolOp.findByIdAndRemove({_id: req.params.id}).then(function(volOp){
        res.send(volOp);
    });
    res.send({type: 'DELETE'});
});


// --- Events---
router.get('/emailEvent/', function(req, res, next){
    
var eventObj = {
  start: new Date("December 17, 2017 12:00:00"),
  end: new Date("December 17, 2017 13:00:00"),
  title: 'Annual trip',
  description: 'Lets enjoy and relax',
  id: 'wdcwe76234e127eugb3', 
  organiser: {name: 'Brandon Joyce', email:'bwjoyce@uncg.edu'},
  location: 'Goa'
}

var cal = ical();

cal.setDomain('http://www.google.com/').setName('My ical invite');

cal.addEvent({
  start: eventObj.start,
  end: eventObj.end,
  summary: eventObj.title,
  uid: eventObj.id, // Some unique identifier
  sequence: 0,
  description: eventObj.description,
  location: eventObj.location,
  organizer: {
                name: eventObj.organiser.name,
                email: eventObj.organiser.email
          },
  method: 'request'
});

var myPath = __dirname + '/uploads/'+ eventObj.id + '.ics';

//fix path in windows (make sure slashes are right)
var correctedPath = path.normalize(myPath);

cal.saveSync(correctedPath);


var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "evolunteersuncg@gmail.com" ,
        pass: "evolunteerspassword"
    }
});
var mailObj = {
  from: "evolunteersuncg@gmail.com",
    to: "bwjoyce@uncg.edu",
    subject: "Second Test",
    text: "If you are reading this, it worked",
  attachments: {path: correctedPath}
};


transporter.sendMail(mailObj, function(err, info){
       if(err===null){
          console.log(correctedPath);
          console.log("iff")
       } else{
          //console.log(err,info);
          console.log(correctedPath);
       }
       
});



      res.send("Sent"+[correctedPath]);
    
});

module.exports = router;
