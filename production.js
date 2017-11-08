const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const ClientStatsPath = path.join(__dirname, './static/stats.json');
const ServerRendererPath = path.join(__dirname, './static/server.js');
const ServerRenderer = require(ServerRendererPath).default;
const Stats = require(ClientStatsPath);
const config = require('./webpack.production.config.js');

const dbUri = "mongodb://admin:csc490@108.234.184.90/admin"

// load models and connect to db
require('./app/models').connect(dbUri);

// set up body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localUserLoginStrategy = require('./server/passport/local-login-user');
const localOrgLoginStrategy = require('./server/passport/local-login-org')
passport.use('local-signup', localSignupStrategy);
passport.use('local-login-user', localUserLoginStrategy);
passport.use('local-login-org', localOrgLoginStrategy);

// initialize routes
const authRoutes = require('./app/routes/auth');
const apiRoutes = require('./app/routes/api');
const pageRoutes = require('./app/routes/approutes')
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/', pageRoutes);

app.use(ServerRenderer(Stats));

app.listen(3000);
