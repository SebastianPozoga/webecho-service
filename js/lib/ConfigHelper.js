'use strict';

module.exports = class ConfigHelper{

  constructor(config, logger) {
    this.config = config;
    this.logger = logger;
  }

  getTokenRow(token) {
    for (var i in this.config.tokens) {
      if (this.config.tokens[i].token === token) {
        return this.config.tokens[i];
      }
    }
    this.logger.error('No find token');
    return null;
  };

  isWrite(token, action){
    var tokenConfig = this.getTokenRow(token);
    if(!tokenConfig || !tokenConfig.roles) return false;
    return this.isWriteInTheRoles(tokenConfig.roles, action);
  }

  isWriteInTheRoles(roles, action){
    if(!roles) return false;
    if(['a','w'].indexOf(roles[action]) !== -1){
        return true
    }
    return false;
  }
};
