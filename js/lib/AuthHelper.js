'use strict';

module.exports = class ConfigHelper{

  constructor(configHelper, logger) {
    this.configHelper = configHelper;
    this.logger = logger;
  }

  auth(socket, token) {
    //var token = socket.handshake.query.token,
    var row = this.configHelper.getTokenRow(token);
    if (!row) return false;
    socket.roles = row.roles || {};
    socket.filters = row.filters || {};
    socket.token = token;
    this.logger.log('auth', row);
    return true;
  };

};
