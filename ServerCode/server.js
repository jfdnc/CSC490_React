const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const session = require('express-session')

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
const localUserLoginStrategy = require('./server/passport/local-login-user');
const localOrgLoginStrategy = require('./server/passport/local-login-org')
const myFacebookStrategy = require('./server/passport/facebook-login')//(app, passport)
passport.use('local-signup', localSignupStrategy);
passport.use('local-login-user', localUserLoginStrategy);
passport.use('local-login-org', localOrgLoginStrategy);
passport.use('facebook-login', myFacebookStrategy);

//START
//might not need this
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
//setup express session, may need to delete later.  Use for Facebook login
app.use(session({
    secret: 'da illest developer',
    resave: true,
    saveUninitialized: true
}))
//END

// set up authentication middleware
//const authCheckMiddleware = require('./server/middleware/auth-check');
//app.use('/api', authCheckMiddleware);

// initialize routes
const authRoutes = require('./app/routes/auth');
const apiRoutes = require('./app/routes/api');
const pageRoutes = require('./app/routes/approutes')
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/', pageRoutes);

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
