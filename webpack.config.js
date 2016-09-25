const path = require("path");

module.exports = {
	context: path.resolve("./src"),
  entry: {
    vendor: [ "babel-polyfill", "react", "react-dom" ],
    note: [ "./app.js" ]
  },
  output: {
      path: path.resolve("./static/assets"),
      publicPath: "/assets/",
      filename: "[name]/bundle.js"
  },
	module: {
		preLoaders: [
			{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
		],
		loaders: [
			{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ["es2015", "stage-2", "react"]
        }
      }
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.json', '.scss', '.css' ],
		moduleDirectories: [ 'lib', 'node_modules' ]
	},
  target: "electron"
};
