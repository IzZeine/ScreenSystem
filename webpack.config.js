'use strict';

const IN_PRODUCTION = process.env.NODE_ENV === "production";

const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// addons
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

// define the config as being the development one
const webpackConfig = {
  entry: {
    "app": './src/js/app.js',
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname + '/dist/build/'),
  },

  mode: 'development',
  devtool: 'eval-cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,//added
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css"
    }),
  ],


  optimization: {},
  watchOptions:
    {
      aggregateTimeout: 300,
      poll: true
    },

  resolve: {
    extensions: ['.js', '.scss', '.css'],
    alias: {}
  },
  externals: {}
}

// Perform changes for productions
if (IN_PRODUCTION) {


  delete webpackConfig.devtool;
  webpackConfig.mode = "production";

  webpackConfig.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        extractComments: 'some',
        terserOptions: {
          format: {
            comments: /@license/i,
          },
          compress: {
            drop_console: true,
          },
        }
      }),
    ],
  }
}

// share the configuration
module.exports = webpackConfig;