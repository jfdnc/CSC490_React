var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');

var config = {
    devtool: 'eval',
    entry: [
        // For hot style updates
        'webpack/hot/dev-server',

        // The script refreshing the browser on none hot updates
        'webpack-dev-server/client?http://localhost:8080',

        // Our application
        mainPath],
    output: {
        path: buildPath,
        filename: 'bundle.js',

        // Everything related to Webpack should go through a build path,
        // localhost:3000/build. That makes proxying easier to handle
        publicPath: '/build/'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {

        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                },
                exclude: [nodeModulesPath]
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash].[ext]'
                }
            }
        ]
    },

    // We have to manually add the Hot Replacement plugin when running
    // from Node
    plugins: [new Webpack.HotModuleReplacementPlugin()]
};

module.exports = config;