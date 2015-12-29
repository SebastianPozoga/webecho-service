'use strict';

var AuthHelper = require('../../js/lib/AuthHelper'),
  ConfigHelper = require('../../js/lib/ConfigHelper'),
  SocketMock = require('../mocks/SocketMock'),
  LoggertMock = require('../mocks/LoggerMock'),
  test = require('unit.js');

describe('lib/AuthHelper', function() {

  describe('.auth(socket, token)', function() {
    it('should be function', function() {
      var configHelper = new ConfigHelper({}, LoggertMock.logger),
        authHelper = new AuthHelper(configHelper, LoggertMock.logger);
      test.function(authHelper.auth);
    });

    it('should set roles', function() {
      var result, configHelper = new ConfigHelper({
          tokens: [{
            token: 'tokenId',
            roles: {
              echo: 'w'
            }
          }]
        }, LoggertMock.logger),
        authHelper = new AuthHelper(configHelper, LoggertMock.logger),
        socket = new SocketMock();

      result = authHelper.auth(socket, 'tokenId');

      test.assert(result);
      test.object(socket.roles);
      test.assert(socket.roles.echo === 'w');
    });

    it('should set filters', function() {
      var result, configHelper = new ConfigHelper({
          tokens: [{
            token: 'tokenId',
            filters: {
              myfilter: 'params'
            }
          }]
        }, LoggertMock.logger),
        authHelper = new AuthHelper(configHelper, LoggertMock.logger),
        socket = new SocketMock();

      result = authHelper.auth(socket, 'tokenId');

      test.assert(result);
      test.object(socket.filters);
      test.assert(socket.filters.myfilter === 'params');
    });
  });

});
