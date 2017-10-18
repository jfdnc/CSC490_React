var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var mongoose = require('mongoose');
var Organization = require('./app/models/orgModel');
var User = require('./app/models/userModel');
var VolOp = require('./app/models/volOpModel');

var proxy = httpProxy.createProxyServer();
var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

// We only want to run the workflow when not in production
if (!isProduction) {

    // We require the bundler inside the if block because
    // it is only needed in a development environment.
    var bundle = require('./server/bundle.js');
    bundle();

    // Any requests to localhost:3000/build is proxied
    // to webpack-dev-server
    app.all('/build/*', function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080'
        });
    });

}

//Establish remote db connection
mongoose.connect('mongodb://admin:csc490@192.168.1.102/admin');
var db= mongoose.connection;

//Check for DB connection errors
db.on('error', function(err){
    console.log(err);
});

//Check DB connection
db.once('open', function(){
    console.log('Connected to MongoDB.')
});

//API Routing
app.get('/api/organization', function (req,res){
    Organization.getOrg(function (err, organization){
        if(err){
            throw err;
        }
        res.json(organization);
    });
});

app.get('/api/user', function (req,res){
    User.getUser(function (err, user){
        if(err){
            throw err;
        }
        res.json(user);
    });
});

app.get('/api/volop', function (req,res){
    VolOp.getVolOp(function (err, volOp){
        if(err){
            throw err;
        }
        res.json(volOp);
    })
});


// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function () {
    console.log('Server running on port ' + port);
});