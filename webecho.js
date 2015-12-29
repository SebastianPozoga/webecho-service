'use strict';

var MainApp = require('./js/main'),
  main,
  args = {
    isWebdebug: false,
    configPath: "./config/config.json"
  },
  config;

//decode arguments
for (var i = 0; i < process.argv.length; i++) {
  if (process.argv[i] === "--webdebug") {
    args.isWebdebug = true;
  }
  if (process.argv[i].startsWith("--config")) {
    var arg = process.argv[i].split("=", 2);
    args.config = arg[1];
  }
}

//run
config = require(args.configPath);

if (args.isWebdebug) {
  config.webdebug = true;
}

main = new MainApp(config);
main.start();
