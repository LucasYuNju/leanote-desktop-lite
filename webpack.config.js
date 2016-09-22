const path = require("path");

module.exports = {
  context: path.resolve("./src"),
  entry: {
    vendor: [ "react", "react-dom" ],
    note: [ "./index.js" ]
  },
  output: {
      path: path.resolve("./public/assets"),
      publicPath: "/assets/",
      filename: "[name]/index.js"
  },
  module: {
      loaders: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loaders: ["babel-loader?sourceRoot=./src"]
          }
      ]
  },
}
