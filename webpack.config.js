const path = require("path");
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
	context: path.resolve("./src"),
  entry: {
    vendor: [ "babel-polyfill", "jquery" ],
    note: [ "./index.js", "../styles/index.less"]
  },
  output: {
      path: path.resolve("./dist/assets"),
      publicPath: "/assets/",
      filename: "[name]/bundle.js"
  },
	module: {
		preLoaders: [
			// {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader'
      // }
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
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
              'url?limit=2048&name=[name]-[sha1:hash:hex:10].[ext]', // Inline images if they're less than 2 KiB
              //'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
      },
      {
          test: /\.(eot|svg|ttf|woff2?)(\?\w+)?$/i,
          loaders: [
              'file?name=[name]-[sha1:hash:hex:10].[ext]',
          ]
      },      // {
      //   test: /\.(eot|woff|woff2|ttf|svg)$/,
      //   loader: "file-loader",
      // },
		]
	},
  plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
      new ExtractTextPlugin("[name]/bundle.css")
  ],
  target: "electron"
};
