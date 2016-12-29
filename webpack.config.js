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
        test: /\.(eot|svg|ttf|otf|woff2?)(\?\w+)?$/i,
        loaders: [
          'file?name=[name]-[sha1:hash:hex:10].[ext]',
        ]
      },
		]
	},
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  plugins: [
    new ExtractTextPlugin("[name]/bundle.css"),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|ko|ja|zh-cn)$/)
  ],
  target: "electron-renderer"
};
