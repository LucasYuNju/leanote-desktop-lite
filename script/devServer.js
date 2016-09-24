const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();

app.use(express.static("../static"));

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

app.listen(8080);
