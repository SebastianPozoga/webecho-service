'use strict';

var bodyParser = require('body-parser'),
  AuthHelper = require('../lib/AuthHelper'),
  logger = require('../lib/Logger').logger;

module.exports = class RestModule {

  constructor(configHelper, echoHelper, app) {
    this.configHelper = configHelper;
    this.echoHelper = echoHelper;
    this.app = app;

    // default dependencies
    this.logger = logger;
  }

  init() {
    this.app.use(bodyParser.json());

    this.app.post('/rest/emit', function(req, res) {
      var token = req.body.token,
        action = req.body.action,
        data = req.body.data;

      if (this.emit(token, action, data)) {
        res.json({
          status: 'ok'
        });
      } else {
        this.logger.error('Token ' + token + ' can not write ' + action + ' action');
        res.json({
          status: 'error'
        }, 403);
      }
    });

    this.logger.log('rest module... started');
  }

  emit(token, action, data) {
    if (!this.configHelper.isWrite(token, action)) {
      return false;
    }
    this.echoHelper.emit(action, data);
    return true;
  }

};
