var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    //'webpack/hot/dev-server',//命令里有-hot
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'src/entry.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by fdb'),
    new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'test',
      filename: 'test.html'
    })

  ]
}