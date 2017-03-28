var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

module.exports = {
  entry: {
    //'webpack/hot/dev-server',//命令里有-hot
    //'webpack-dev-server/client?http://localhost:8080',
    index:path.resolve(__dirname, 'src/entry.js'),
    vendors: ['react']
  },
  resolve: {
    alias: {
      'react': pathToReact
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },{
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    },{
      test: /\.scss$/,
      loader: 'style!css!sass'
    },{
      test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
      //exclude: /node_modules/,
      exclude:[node_modules]
      loader: 'babel-loader'
    },{
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    },{
      test: /\.woff$/,
      loader: 'url?limit=100000'
    }],
    noParse:[pathToReact]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by fdb'),
    new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'test',
      filename: 'test.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({name:'vendors',filename:'vendors.js'})
      ]
}