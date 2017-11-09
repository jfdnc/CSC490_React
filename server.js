const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const session = require('express-session')
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');

// load up the user model
var User       = require('./app/models/userModel');

// load the auth variables
var configAuth = require('./auth');

// load models and connect to db
require('./app/models').connect(config.dbUri);

const proxy = httpProxy.createProxyServer();
const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

// set up body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
//const FacebookStrategy = require('./server/passport/facebook-login')
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);
//passport.use('facebook-login', FacebookStrategy);
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var fbCallback = function(token, refreshToken, profile, done){

     // asynchronous
     process.nextTick(function() {

       User.remove({ _id: '5a03cd1c17b11e2b00acaae8' }, function(err) {
        if (!err) {
            //message.type = 'notification!';
        }
        else {
            //message.type = 'error';
        }
        });
       
            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();

                    // set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                     newUser.email=newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                     newUser.firstName =  profile.name.givenName
                     newUser.lastName = profile.name.familyName
                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });

                    const payload = {
                        sub: newUser.facebook.id
                    };

                    // Create a token string
                    const token2 = jwt.sign(payload, config.jwtSecret);
                    const data = {
                        firstName: newUser.firstName,
                        lastName: newUser.lastName

                    };

                    return done(null, token2, data);

            //return done(null, newUser)
        }

    });
        });

 };

 var fbOpts = {
    clientID        : configAuth.facebookAuth.clientID,
    clientSecret    : configAuth.facebookAuth.clientSecret,
    callbackURL     : configAuth.facebookAuth.callbackURL,
    profileFields:['id','name','emails']

};

passport.use(new FacebookStrategy(fbOpts, fbCallback))

// set up authentication middleware
//const authCheckMiddleware = require('./server/middleware/auth-check');
//app.use('/api', authCheckMiddleware);

// initialize routes
const authRoutes = require('./app/routes/auth')//(passport);
const apiRoutes = require('./app/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

//add facebook login route
app.use(session({
    secret: 'da illest developer',
    resave: true,
    saveUninitialized: true
}))


app.route('/auth2/facebook').get(passport.authenticate('facebook',{scope: ['email']}))

//app.route('/auth2/facebook/callback').get(passport.authenticate('facebook',function(err,user,info){
 //   console.log(err,user,info)
//}))

app.route('/auth2/facebook/callback').get(passport.authenticate('facebook'),function(req,res){
            if(req.user.email!=null){
                res.redirect('/?email='+req.user.email+'&firstName='+req.user.firstName+'&lastName='+req.user.lastName+'&facebookNonsense=')
            } else{
                res.redirect('/')
            }
            
        })

/*
app.route('/auth2/facebook/callback').get(passport.authenticate('facebook',{
            successRedirect : '/'+req.user.email,
            failureRedirect : '/'
        }))
        */

// route for logging out
    app.route('/logout2').get( function(req, res) {
        req.logout();
        res.redirect('/');
    });

/*
app.get('/auth2/facebook', passport.authenticate('facebook-login', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
app.get('/auth2/facebook/callback',
        passport.authenticate('facebook-login', {
            successRedirect : '/',
            failureRedirect : '/'
        }));
        */





// We only want to run webpack when not in production
if (!isProduction) {

    const bundle = require('./server/bundle.js');
    bundle();

    // Any requests to localhost:3000/build is proxied
    // to webpack-dev-server
    app.all('/build/*', function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080'
        });
    });

}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function () {
    console.log('Server running on port ' + port);
});
