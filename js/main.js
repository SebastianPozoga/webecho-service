'use strict';

var app = require('express')(),
  server = require('http').Server(app),
  io = require('socket.io')(server),

  ConfigHelper = require("./lib/ConfigHelper"),
  EchoHelper = require("./lib/EchoHelper"),
  logger = require("./lib/Logger").logger,

  SocketModule = require("./modules/SocketModule"),
  RestModule = require("./modules/RestModule"),
  WebdebugModule = require("./modules/WebdebugModule");

module.exports = class MainApp {

  constructor(config) {
    this.config = config;

    //default dependencies
    this.configHelper = new ConfigHelper(this.config, this.logger);
    this.echoHelper = new EchoHelper();
    this.server = server;
    this.app = app;
    this.io = io;
    this.logger = logger;
  }

  start() {
    if (this.config.webdebug === true) {
      this.webdebugModule = new WebdebugModule(this.app);
      this.webdebugModule.init();
    }

    this.restModule = new RestModule(this.configHelper, this.echoHelper, this.app);
    this.restModule.init();

    this.socketModule = new SocketModule(this.configHelper, this.echoHelper, this.io);
    this.socketModule.init();

    this.server.listen(this.config.port);
    this.logger.log("echo server started", [this.config]);
  }

};
