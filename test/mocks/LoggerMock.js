'use strict';

module.exports.Logger = class LoggerMock {

  constructor(){
  }

  log(msg, args) {
  }

  error(msg, args) {
  }

  critic(msg, args) {
  }

};

module.exports.logger = new module.exports.Logger();
