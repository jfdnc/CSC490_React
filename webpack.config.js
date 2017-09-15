module.exports = {
  entry: [
    /**comment out two lines before building
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    **/
    './src/index.js'
  ],
  module: {
    loaders: [{
      test: /.\jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot-loader!babel-loader'
    },{
    test: /\.(jpg|png|svg)$/,
    loader: 'file-loader',
    options: {
      name: '[path][name].[hash].[ext]',
    },
},]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/projectGit/CSC490-Project/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './projectGit/CSC490-Project/dist',
    hot: true
  }
};
