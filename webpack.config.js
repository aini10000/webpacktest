var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
    mobile: path.resolve(__dirname, 'src/mobile.js'),
    vendors: ['react'] // 其他库
  },
  resolve: {
    alias: {
      'react': pathToReact
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({fallback:'style-loader',use:'css-loader'})
    },{
      test: /\.less$/,
      loader: ExtractTextPlugin.extract({fallback:'style-loader',use:'less-loader'})
    },{
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({fallback:'style-loader',use:'sass-loader'})
    },{
      test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
      //exclude: /node_modules/,
      exclude:[node_modules],
      loader: ['react-hot-loader','babel-loader']
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
    new webpack.optimize.CommonsChunkPlugin({name:'vendors',filename:'vendors.js'}),
    // 拆分css
    new ExtractTextPlugin('css/[name].css'),
    //编译时候压缩js,css文件
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false
        },
        mangle: {
            except: ['$super', '$', 'exports', 'require', 'module', '_'] // 排除不想要压缩的对象名称
        }
      })
    ]
}