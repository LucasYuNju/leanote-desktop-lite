const path = require("path");

module.exports = {
	context: path.resolve("./src"),
  entry: {
    vendor: [ "babel-polyfill", "react", "react-dom" ],
    note: [ "./index.js" ]
  },
  output: {
      path: path.resolve("./public/assets"),
      publicPath: "/assets/",
      filename: "[name]/bundle.js"
  },
	module: {
		preLoaders: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loaders: [ 'eslint-loader' ] }
		],
		loaders: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loaders: [ 'babel' ] }
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.json', '.scss', '.css' ],
		moduleDirectories: [ 'lib', 'node_modules' ]
	},
	plugins: [
	],
  target: "electron"
};
