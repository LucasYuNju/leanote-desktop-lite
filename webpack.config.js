const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
	context: path.resolve("./src"),
  entry: {
    vendor: ['babel-polyfill'],
    main: ['./main.js', '../static/index.less'],
    auth: ['./auth.js', '../static/index.less']
  },
  output: {
      path: path.resolve("./static/assets"),
      publicPath: "/assets/",
      filename: "[name]/bundle.js"
  },
	module: {
		preLoaders: [
		],
		loaders: [
			{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ["es2015", "stage-2", "react"],
        }
      },
      {
        test: /\.(less|css)$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader"),
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.svg$/,
        loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]'
      },
      {
        test: /\.woff$/,
        loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]'
      },
      {
        test: /\.woff2$/,
        loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]'
      },
      {
        test: /\.[ot]tf$/,
        loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]'
      },
      {
        test: /\.eot$/,
        loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]'
      },
		]
	},
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css']
  },
  plugins: [
    new ExtractTextPlugin("[name]/bundle.css"),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|ko|ja|zh-cn)$/)
  ],
  target: "electron-renderer"
};
