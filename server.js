const express = require("express");
const webpack = require("webpack");
const path = require("path");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
app.use(express.static(path.join(__dirname, './dist')));

const builderConfig = require("./webpack.config");
const builder = webpack(builderConfig);
app.use(webpackDevMiddleware(
  builder,
  {
		hot: true,
    publicPath: builderConfig.output.publicPath,
    stats: {
      chunks: false,
      colors: true,
    }
  }
));

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

module.exports = app;
