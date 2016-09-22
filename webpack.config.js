// const path = require("path");
// 
// module.exports = {
//   context: path.resolve("./src"),
//   devtool: 'cheap-module-eval-source-map',
//   entry: {
//     vendor: [ "babel-polyfill", "react", "react-dom" ],
//     note: [ "./index.js" ]
//   },
//   output: {
//       path: path.resolve("./public/assets"),
//       publicPath: "/assets/",
//       filename: "[name]/index.js"
//   },
//   module: {
//       loaders: [
//           {
//               test: /\.js$/,
//               exclude: /node_modules/,
//               loaders: ["babel-loader?sourceRoot=./src"]
//           }
//       ]
//   },
// }

const path = require("path");
// const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
	context: path.resolve("./src"),
  entry: {
    vendor: [ "babel-polyfill", "react", "react-dom" ],
    note: [ "./index.js" ]
  },
  output: {
      path: path.resolve("./public/assets"),
      publicPath: "http://localhost:9000/assets/",
      filename: "[name]/index.js"
  },

	module: {
		preLoaders: [
			// { test: /\.jsx?$/, exclude: /node_modules/, loaders: [ 'eslint-loader' ] }
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
		// new HtmlWebpackPlugin( {
		// 	title: 'Leanote',
		// 	templateContent: require( './index-builder.js' ),
		// 	inject: false
		// } )
	]
};
