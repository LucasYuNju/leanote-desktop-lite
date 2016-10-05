const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
	context: path.resolve("./src"),
  entry: {
    vendor: [ "babel-polyfill", "react", "react-dom" ],
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
          presets: ["es2015", "stage-2", "react"]
        }
      },
      {
        test: /\.(less|css)$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      }
		]
	},
  plugins: [
      new ExtractTextPlugin("[name]/bundle.css")
  ],
  target: "electron"
};
