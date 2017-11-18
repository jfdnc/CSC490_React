const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

//for calendar event
const path = require('path');
const ical = require('../util/my-ical-generator');
const VolOp = require('../models/volOpModel');
const Organization = require('../models/orgModel');
const fs = require('fs');

router.get('/testroute', function (req, res) {
  res.send('server rendered routes go here!')
})

// ---EMAIL EVENTS---

//send email to admin notifying of new org request
router.post('/emailRequest', function(req, res){
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "evolunteersuncg@gmail.com",
            pass: "evolunteerspassword"
        }
    });

    const mailOptions={
        from: 'evolunteersuncg@gmail.com',
        to: 'evolunteersuncg@gmail.com',
        subject: 'eVol: New Organization Registration',
        html: 'A new organization has registered for access to eVol. ' +
        'Please click the link below to view more details.<br><br>' +
        '<a href="http://localhost:3000/orgrequests">View Requests</a>'
    };
    console.log(mailOptions);
    transport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});

//send email to org notifying of approval
router.post('/emailApprove', function (req, res){
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "evolunteersuncg@gmail.com",
            pass: "evolunteerspassword"
        }
    });

    const mailOptions={
        from: 'evolunteersuncg@gmail.com',
        to: req.body.orgEmail,
        subject: 'eVol: New Organization Registration (Approved)',
        html: 'This mail is to inform you that your organization registration has been approved. ' +
        'You now have access to login and create volunteer opportunities.<br><br>' +
        '<a href="http://localhost:3000">Visit eVol</a>'
    }
    console.log(mailOptions);
    transport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});

//send email to org notifying of denial
router.post('/emailDecline', function (req, res){
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "evolunteersuncg@gmail.com",
            pass: "evolunteerspassword"
        }
    });

    const mailOptions={
        from: 'evolunteersuncg@gmail.com',
        to: req.body.orgEmail,
        subject: 'eVol: New Organization Registration (Denied)',
        html: 'This mail is to inform you that your organization registration has been denied. ' +
        'Thank you for your interest in eVol but we could not approve your request based on the information given.'
    }
    console.log(mailOptions);
    transport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});



// --- Calendar Events---
router.post('/emailEvent', function(req, res, next){

VolOp.findById({_id: req.body.id}).then(function(volOp){

 // Organization.findByIdAndUpdate({_id: '5a0876fc6d6b190ce0a05e05'}, {orgName: 'Vol R Us'}).then(function(organization){
 //   res.send(organization);
 // })
    //res.send(volOp);

//if(volOp.orgName=='Vols R Us'){
//  volOp.orgName = 'Vol R Us'
//}

//console.log(volOp)
  
Organization.findOne({orgName: volOp.orgName}).then(function(organization){
      //res.send(organization);
  
    
var eventObj = {
  start: new Date(volOp.volOpStartDate),
  end: new Date(volOp.volOpEndDate),
  title: volOp.volOpName,
  description: volOp.volOpDescription,
  id: Date.now()+ req.body.userEmail.split('@')[0]+'_'+volOp.volOpName, 
  organiser: {name: volOp.orgName, email: organization.orgEmail},
  location: volOp.volOpAddress.street+', '+volOp.volOpAddress.city+', '+volOp.volOpAddress.state+' '+volOp.volOpAddress.zip
}

var cal = ical();

cal.setDomain('http://localhost:3000').setName('eVol iCal invite');

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
    to: req.body.userEmail,
    subject: "Your eVol Calendar Reminder!",
    text: "Thanks for agreeing to volunteering in your local community!\n\nDo not forget to add this event to your calendar :)\n\n-- The eVol team",
  attachments: {path: correctedPath}
};


transporter.sendMail(mailObj, function(err, info){
       if(err==null){
          console.log(correctedPath);
          console.log("Sent")
          fs.unlink(correctedPath, (err) => {
              if (err) throw err;
              console.log('successfully deleted ICS file');
          });
          res.send("Sent");
       } else{
          //console.log(err,info);
          console.log(correctedPath);
          console.log(JSON.stringify(err.name))
          fs.unlink(correctedPath, (err) => {
              if (err) throw err;
              console.log('successfully deleted ICS file');
          });
          res.send(err.name);
       }
       
});



  });    
 });   
});

module.exports = router;


module.exports = router;
