const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
	context: path.resolve("./src"),
  entry: {
    vendor: [],
    main: ['./main.js', '../styles/index.less'],
    auth: ['./auth.js', '../styles/index.less']
  },
  output: {
      path: path.resolve("./dist/assets"),
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
    // new webpack.optimize.UglifyJsPlugin(),
    // new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  ],
  target: "electron"
};
