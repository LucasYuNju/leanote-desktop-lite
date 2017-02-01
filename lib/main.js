function parseCommanLineArgs(argv) {
  const optimist = require('optimist');
  const options = optimist(argv);
  options.alias('d', 'dev').boolean('d').describe('d', 'Run in development mode.');
  return {
    devMode: options.argv['dev'],
  };
}

function start() {
  const options = parseCommanLineArgs(process.argv);
  const Application = require('./application');
  global.application = new Application();
  global.application.start(options);
}

start();
