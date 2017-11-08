const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

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
        to: 'mario.month@gmail.com',
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

module.exports = router;
