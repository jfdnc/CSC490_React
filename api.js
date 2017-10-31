const express = require('express');
const router = express.Router();
const Address = require('../models/addressModel');
const Organization = require('../models/orgModel');
const User = require('../models/userModel');
const VolOp = require('../models/volOpModel');

// ---ORGANIZATION---
// get a list of organizations from the db
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

// update an organization's orgVolOps in db
router.put('/organizations/:orgId/:volOpId', function(req, res, next){
  Organization.findByIdAndUpdate({_id: req.params.orgId},
    {$push: {orgVolOps: req.params.volOpId}}).then(function(){
      Organization.findOne({_id: req.params.orgId}).then(function(organization){
        res.send(organization);
      });
    });
});

// delete an organization from the db
router.delete('/organizations/:id', function(req, res, next){
    Organization.findByIdAndRemove({_id: req.params.id}).then(function(address){
        res.send(organization);
    });
    res.send({type: 'DELETE'});
});

// ---USER---
/*
// get a list of users from the db
router.get('/users', function(req, res, next){
    User.get(function (err, users){
        if(err){
            throw err;
        }
        var allUsers = users.map(user => {
            return { id: user.id, email: user.email }
        });
        res.json(allUsers);
    })
});
*/


// get a list of all users from the db
router.get('/users', function(req, res, next){
  User.find().then(function(user){
    res.send(user);
  });
});

// get a specific user from the db using email as key
router.get('/users/:email', function(req, res, next){
    User.findOne({email: req.params.email}).then(function(user){
        res.send(user);
    });
});


// add a new user to the db
router.post('/users', function(req, res, next){
    User.create(req.body).then(function(user){
        res.send(user);
    }).catch(next);
});

// update a user in the db
router.put('/users/:id', function(req, res, next){
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        User.findOne({_id: req.params.id}).then(function(user){
            res.send(user);
        });
    });
});

// update a user's savedVolOps in db
router.put('/users/:userId/:volOpId', function(req, res, next){
  User.findByIdAndUpdate({_id: req.params.userId},
    {$push: {savedVolOps: req.params.volOpId}}).then(function(){
      User.findOne({_id: req.params.userId}).then(function(user){
        res.send(user);
      });
    });
});

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

module.exports = router;
