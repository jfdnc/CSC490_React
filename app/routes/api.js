const express = require('express');
const router = express.Router();
const Address = require('../models/addressModel');
const Organization = require('../models/orgModel');
const User = require('../models/userModel');
const VolOp = require('../models/volOpModel');

// ---ADDRESS---
// get a list of addresses from the db
router.get('/addresses/:id', function(req, res, next){
    Address.findOne({street: req.params.id}).then(function(address){
        res.send(address);
        res.send({type: 'GET'});
    });
});

// add a new address to the db
router.post('/addresses', function(req, res, next){
    Address.create(req.body).then(function(address){
        res.send(address);
    }).catch(next);
});

// update an address in the db
router.put('/addresses/:id', function(req, res, next){
    Address.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Address.findOne({_id: req.params.id}).then(function(address){
            res.send({address});
        });
    });
});

// delete an address from the db
router.delete('/addresses/:id', function(req, res, next){
    Address.findByIdAndRemove({_id: req.params.id}).then(function(address){
        res.send(address);
    });
    res.send({type: 'DELETE'});
});

// ---ORGANIZATION---
//get a list of organizations from the db
router.get('/organizations', function(req, res, next){
    res.send({type: 'GET'});
});

// add a new organization to the db
router.post('/organizations', function(req, res, next){
    Organization.create(req.body).then(function(organization){
        res.send(organization);
    }).catch(next);
});

// update an organization in the db
router.put('/organizations/:id', function(req, res, next){
    Address.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Address.findOne({_id: req.params.id}).then(function(address){
            res.send({address});
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
// get a list of users from the db
router.get('/users', function(req, res, next){
    User.getUser(function (err, users){
        if(err){
            throw err;
        }
        var allUsers = users.map(user => {
            return { id: user.id, email: user.email }
        });
        res.json(allUsers);
    })
});

//get a specific user from the db
router.get('/users/:id', function(req, res, next){
    User.findOne({_id: req.params.id}).then(function(user){
        res.send({user});
    })
});

// add a new user to the db
router.post('/users', function(req, res, next){
    var newUser = new User(req.body)
    console.log(req.body)
    newUser.save().then(function(user){
        res.send(user);
    }).catch(next);
});

// update a user in the db
router.put('/users/:id', function(req, res, next){
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        User.findOne({_id: req.params.id}).then(function(user){
            res.send({user});
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
// get a list of volOps from the db
router.get('/volOps', function(req, res, next){
    res.send({type: 'GET'});
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
router.delete('/users/:id', function(req, res, next){
    VolOp.findByIdAndRemove({_id: req.params.id}).then(function(volOp){
        res.send(volOp);
    });
    res.send({type: 'DELETE'});
});

module.exports = router;
