'use strict';

var AuthHelper = require('../lib/AuthHelper'),
  logger = require('../lib/Logger').logger;

module.exports = class SocketModule {

  constructor(configHelper, echoHelper, io) {
    this.configHelper = configHelper;
    this.echoHelper = echoHelper;
    this.io = io;

    // default dependencies
    this.logger = logger;
    this.authHelper = new AuthHelper(configHelper, logger);
  }

  init() {
    this.io.use((function(socket, next) {
      if (this.authHelper.auth(socket, socket.handshake.query.token)) {
        this.logger.log('Login success');
        next();
      } else {
        this.logger.error('Authentication error');
        next(new Error('Authentication error'));
      }
    }).bind(this));

    this.io.on('connection', this.initSocket.bind(this));
    this.logger.log('socket module... started');
  }

  initSocket(socket) {
    function onSocketEcho(data) {
      try {
        this.echo(socket, data);
      } catch (err) {
        this.logger.error('onSocketEcho exception', [err]);
      }
    };

    function onSocketUpdateFilter(filters) {
      socket.filters = filters;
    };

    this.echoHelper.addSocket(socket);
    socket.on('echo', onSocketEcho.bind(this));
    socket.on('update_filters', onSocketUpdateFilter.bind(this));
  }

  echo(socket, data) {
    if (this.configHelper.isWriteInTheRoles(socket.roles, data.action)) {
      this.logger.log('emit', data);
      this.echoHelper.emit(data.action, data.data);
    } else {
      this.logger.log('user with token ' + socket.token + ', emit ' + data.action + ' action without write role');
    }
  }

};
