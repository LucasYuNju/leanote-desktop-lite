const express = require("express");
const webpack = require("webpack");
const path = require("path");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();

app.use(express.static(path.join(__dirname, '../dist'))); //  "public" off of current is root

const builderConfig = require("../webpack.config");
const builder = webpack(Object.assign({
    devtool: "cheap-module-source-map"
}, builderConfig));
app.use(webpackDevMiddleware(
    builder,
    {
        publicPath: builderConfig.output.publicPath
    }
));

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
