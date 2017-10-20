var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var mongoose = require('mongoose');

var proxy = httpProxy.createProxyServer();
var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

// initialize routes
app.use('/api', require('./app/routes/api'));

// We only want to run webpack when not in production
if (!isProduction) {

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
mongoose.connect('mongodb://admin:csc490@108.234.184.90/admin');
var db= mongoose.connection;
mongoose.Promise = global.Promise;

//Check for DB connection errors
db.on('error', function(err){
    console.log(err);
});

//Check DB connection
db.once('open', function(){
    console.log('Connected to MongoDB.')
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