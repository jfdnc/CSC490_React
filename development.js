const express = require('express');
const path = require('path');
const app = express();
const webpack = require('webpack');
const passport = require('passport');
const bodyParser = require('body-parser');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const config = require('./webpack.development.config.js');
const compiler = webpack(config);
const configFile = require('./server/config')

// load models and connect to db
require('./app/models').connect(configFile.dbUri);

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

app.use(webpackDevMiddleware(compiler, {
	publicPath: "/static/",
}));
app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

app.listen(3000);
