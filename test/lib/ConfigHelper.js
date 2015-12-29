'use strict';

var ConfigHelper = require('../../js/lib/ConfigHelper'),
  SocketMock = require('../mocks/SocketMock'),
  LoggertMock = require('../mocks/LoggerMock'),
  test = require('unit.js');

describe('lib/ConfigHelper', function() {

  describe('.getTokenRow(token)', function() {
    it('should be function', function() {
      var configHelper = new ConfigHelper({}, LoggertMock.logger);
      test.function(configHelper.getTokenRow);
    });

    it('should return token row by token', function() {
      var result, configHelper = new ConfigHelper({
        tokens: [{
          token: 'tokenId',
          roles: {
            echo: 'w'
          }
        }]
      }, LoggertMock.logger);

      result = configHelper.getTokenRow('tokenId');
      test.object(result);
      test.assert(result.roles.echo === 'w');
    });

    it('should return null when token is incorrect', function() {
      var result, configHelper = new ConfigHelper({
        tokens: [{
          token: 'tokenId'
        }]
      }, LoggertMock.logger);

      result = configHelper.getTokenRow('otherTokenId');
      test.assert(result === null);
    });
  });

  describe('.isWrite(token, action)', function() {
    it('should be function', function() {
      var configHelper = new ConfigHelper({}, LoggertMock.logger);
      test.function(configHelper.isWrite);
    });

    it('should return true if token action is w (writable)', function() {
      var result, configHelper = new ConfigHelper({
        tokens: [{
          token: 'tokenId',
          roles: {
            echo: 'w'
          }
        }]
      }, LoggertMock.logger);

      result = configHelper.isWrite('tokenId', 'echo');
      test.assert(result === true);
    });

    it('should return true if token action is a (writable and readable)', function() {
      var result, configHelper = new ConfigHelper({
        tokens: [{
          token: 'tokenId',
          roles: {
            echo: 'a'
          }
        }]
      }, LoggertMock.logger);

      result = configHelper.isWrite('tokenId', 'echo');
      test.assert(result === true);
    });

    it('should return false if token action is r (readable)', function() {
      var result, configHelper = new ConfigHelper({
        tokens: [{
          token: 'tokenId',
          roles: {
            echo: 'r'
          }
        }]
      }, LoggertMock.logger);

      result = configHelper.isWrite('tokenId', 'echo');
      test.assert(result === false);
    });

    it('should return false if token action is undefined', function() {
      var result, configHelper = new ConfigHelper({
        tokens: [{
          token: 'tokenId',
        }]
      }, LoggertMock.logger);

      result = configHelper.isWrite('tokenId', 'echo');
      test.assert(result === false);
    });

  });
});
