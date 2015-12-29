'use strict';

var RestModule = require('../../js/modules/RestModule'),
  ConfigHelper = require('../../js/lib/ConfigHelper'),
  EchoHelperMock = require('../mocks/EchoHelperMock'),
  LoggertMock = require('../mocks/LoggerMock'),
  test = require('unit.js');

describe('lib/RestModule', function() {

  describe('.emit(token, action, data)', function() {
    it('should be function', function() {
      var configHelper = new ConfigHelper({}, LoggertMock.logger),
        echoHelperMock = new EchoHelperMock(),
        restModule = new RestModule(configHelper, echoHelperMock);

      //set mock dependencies
      restModule.logger = LoggertMock.logger;

      test.function(restModule.emit);
    });

    it('return true adn emit data  when token has rights to action', function() {
      var configHelper = new ConfigHelper({
          tokens: [{
            token: 'tokenId',
            roles: {
              echo: 'w'
            }
          }]
        }, LoggertMock.logger),
        echoHelperMock = new EchoHelperMock(),
        restModule = new RestModule(configHelper, echoHelperMock);

      //set mock dependencies
      restModule.logger = LoggertMock.logger;

      test.assert(restModule.emit('tokenId', 'echo', {}));
      test.assert(echoHelperMock.$$emited);
    });

    it('return false when token does\'t have permissions to action', function() {
      var configHelper = new ConfigHelper({
          tokens: [{
            token: 'tokenId',
            roles: { }
          }]
        }, LoggertMock.logger),
        echoHelperMock = new EchoHelperMock(),
        restModule = new RestModule(configHelper, echoHelperMock);

      //set mock dependencies
      restModule.logger = LoggertMock.logger;

      test.assert(false === restModule.emit('tokenId', 'echo', {}));
      test.assert(false === echoHelperMock.$$emited);
    });

    it('return false when token has read permissions to action only', function() {
      var configHelper = new ConfigHelper({
          tokens: [{
            token: 'tokenId',
            roles: {
              echo: 'r'
            }
          }]
        }, LoggertMock.logger),
        echoHelperMock = new EchoHelperMock(),
        restModule = new RestModule(configHelper, echoHelperMock);

      //set mock dependencies
      restModule.logger = LoggertMock.logger;

      test.assert(false === restModule.emit('tokenId', 'echo', {}));
      test.assert(false === echoHelperMock.$$emited);
    });
  });

});
