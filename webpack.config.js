var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    game: './practice/game/assets/js/game.js'
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          // presets: ['@babel/preset-es2015']
        }
      }
    ]
  },
  devServer:{
    port: '8080',
    contentBase: path.resolve(__dirname, 'practice/game'),
    watchContentBase: true,
    compress:true,
    port: 8080
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};