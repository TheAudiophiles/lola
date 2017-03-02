var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, './dist');
var APP_DIR = path.resolve(__dirname, './src/app');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devtool: '#inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      },
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
    }),
  ]
};

module.exports = config;
