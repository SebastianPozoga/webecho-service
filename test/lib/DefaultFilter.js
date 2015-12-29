'use strict';

var DefaultFilter = require('../../js/lib/DefaultFilter'),
  SocketMock = require('../mocks/SocketMock'),
  test = require('unit.js');

describe('lib/DefaultFilter', function() {
  describe('.filter(socket, data)', function() {
    it('should be function', function() {
      var defaultFilter = new DefaultFilter();
      test.function(defaultFilter.filter);
    });
  });

  // filter use for security
  describe('.filterRole(socket, action, data) ', function() {
    it('should be function', function() {
      var defaultFilter = new DefaultFilter();
      test.function(defaultFilter.filterRole);
    });
    it('should return true if socket.roles[action] is r (read)', function() {
      var defaultFilter = new DefaultFilter(),
        socketMock = new SocketMock();
      socketMock.roles = {
        actionName: 'r'
      };
      test.assert(defaultFilter.filterRole(socketMock, 'actionName', {}));
    });
    it('should return true if socket.roles[action] is a (all)', function() {
      var defaultFilter = new DefaultFilter(),
        socketMock = new SocketMock();
      socketMock.roles = {
        actionName: 'a'
      };
      test.assert(defaultFilter.filterRole(socketMock, 'actionName', {}));
    });
    it('should return false if socket.roles[action] is w (write)', function() {
      var defaultFilter = new DefaultFilter(),
        socketMock = new SocketMock();
      socketMock.roles = {
        actionName: 'w'
      };
      test.assert(false === defaultFilter.filterRole(socketMock, 'actionName', {}));
    });
    it('should return false if socket.roles[action] is undefined', function() {
      var defaultFilter = new DefaultFilter(),
        socketMock = new SocketMock();
      socketMock.roles = {};
      test.assert(false === defaultFilter.filterRole(socketMock, 'actionName', {}));
    });
  });

  // filter use for optymalisation (set by remote app)
  describe('.filterActions(socket, action, data) ', function() {
    it('should be function', function() {
      var defaultFilter = new DefaultFilter();
      test.function(defaultFilter.filterActions);
    });
    it('should return true if filter is unset for a socket', function() {
      var defaultFilter = new DefaultFilter(),
        socketMock = new SocketMock();
      socketMock.filters = {};
      test.assert(defaultFilter.filterActions(socketMock, 'actionName', {}));
    });
    it('should return true if filter is set and contains action name', function() {
      var defaultFilter = new DefaultFilter(),
        socketMock = new SocketMock();
      socketMock.filters = {
        actions: ['actionName', 'otherActionName']
      };
      test.assert(defaultFilter.filterActions(socketMock, 'actionName', {}));
    });
    it('should return false if filter is set and don\'t contains action name', function() {
      var defaultFilter = new DefaultFilter(),
        socketMock = new SocketMock();
      socketMock.filters = {
        actions: ['actionName', 'otherActionName']
      };
      test.assert(false === defaultFilter.filterActions(socketMock, 'anyotherActionName', {}));
    });
  });

  describe('.filterCollections(socket, action, data) ', function() {
    it('should be function', function() {
      var defaultFilter = new DefaultFilter();
      test.function(defaultFilter.filterCollections);
    });
    it('should return true if filter is unset for a socket', function() {
      var defaultFilter = new DefaultFilter(),
        socketMock = new SocketMock();
      socketMock.filters = {};
      test.assert(defaultFilter.filterCollections(socketMock, 'someCollection.actionName', {}));
    });
    it('should return true if filter is set and don\'t contains collection', function() {
      var defaultFilter = new DefaultFilter(),
        socketMock = new SocketMock();
      socketMock.filters = {
        collections: {
          firstCollection: [],
          secondCollection: []
        }
      };
      test.assert(defaultFilter.filterCollections(socketMock, 'thirdCollection.actionName', {}));
    });
    it('should return true if filter is set and contains collection with data id', function() {
      var defaultFilter = new DefaultFilter(),
        socketMock = new SocketMock();
      socketMock.filters = {
        collections: {
          firstCollection: [1, 2, 3],
          secondCollection: []
        }
      };
      test.assert(defaultFilter.filterCollections(socketMock, 'firstCollection.actionName', {
        id: 3
      }));
    });
    it('should return false if filter is set, contains a collection and the collection don\'t contains data id', function() {
      var defaultFilter = new DefaultFilter(),
        socketMock = new SocketMock();
      socketMock.filters = {
        collections: {
          firstCollection: [1, 2, 3],
          secondCollection: []
        }
      };
      test.assert(false === defaultFilter.filterCollections(socketMock, 'firstCollection.actionName', {
        id: 4
      }));
    });
  });

});
