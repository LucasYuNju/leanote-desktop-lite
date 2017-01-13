const express = require('express'); // eslint-disable-line import/no-extraneous-dependencies
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');

const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line import/no-extraneous-dependencies
const builderConfig = require('../webpack.config');

const app = express();
app.use(express.static(path.join(__dirname, '..', 'static')));

const builder = webpack(builderConfig);
app.use(webpackDevMiddleware(
  builder,
  {
    hot: true,
    publicPath: builderConfig.output.publicPath,
    stats: {
      chunks: false,
      colors: true,
    },
  }
));

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

module.exports = app;
