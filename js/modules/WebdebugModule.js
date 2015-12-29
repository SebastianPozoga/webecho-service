'use strict';

var express = require('express'),
  logger = require('../lib/Logger').logger;


module.exports = class WebdebugModule {

  constructor(app) {
    this.app = app;

    //default dependencies
    this.logger = logger;
  }

  init() {
    this.app.use('/rest/emit', express.static('debug/rest/index.html'));
    this.app.use('/', express.static('debug'));
    this.logger.log("webdebug module... started");
  }
};
