'use strict';

var EchoHelper = require('../../js/lib/EchoHelper'),
  SocketMock = require('../mocks/SocketMock'),
  test = require('unit.js');

describe("lib/EchoHelper.js", function() {
  describe(".addSocket()", function() {
    it("should be function", function() {
      var echoHelper = new EchoHelper();
      test.function(echoHelper.addSocket);
    });
    it("should add socket to sockets array", function() {
      var echoHelper = new EchoHelper(),
        socket = new SocketMock();
      test.assert(echoHelper.sockets.length === 0);
      echoHelper.addSocket(socket);
      test.assert(echoHelper.sockets.length === 1);
      test.value(echoHelper.sockets[0]).isEqualTo(socket);
    });
    it("should remove socket on 'disconnect' event", function() {
      var echoHelper = new EchoHelper(),
        socket = new SocketMock();
      test.assert(echoHelper.sockets.length === 0);
      echoHelper.addSocket(socket);
      test.assert(echoHelper.sockets.length === 1);
      socket.$$emit('disconnect', []);
      test.assert(echoHelper.sockets.length === 0);
    });
  });
  describe(".removeSocket()", function() {
    it("should be function", function() {
      var echoHelper = new EchoHelper();
      test.function(echoHelper.removeSocket);
    });
    it("should remove socket from sockets array", function() {
      var echoHelper = new EchoHelper(),
        socket = new SocketMock();
      echoHelper.sockets = [socket];
      echoHelper.removeSocket(socket);
      test.assert(echoHelper.sockets.length === 0);
    });
  });
  describe(".emit()", function() {
    it("should be function", function() {
      var echoHelper = new EchoHelper();
      test.function(echoHelper.emit);
    });
    it("should emit data (no filter by default)", function() {
      var echoHelper = new EchoHelper(),
        socket = new SocketMock(),
        called = false;
      echoHelper.sockets = [socket];
      socket.on('action', (action, data) => {
        called = true;
      });
      echoHelper.emit('action', {
        msg: 'msg'
      });
      test.assert(called === true);
    });
    it("should emit data and run filter", function() {
      var echoHelper = new EchoHelper(),
        socket = new SocketMock(),
        called = false;
      echoHelper.sockets = [socket];
      echoHelper.filter = (socket, emitData) => {
        called = true;
      };
      echoHelper.emit('action', {
        msg: 'msg'
      });
      test.assert(called === true);
    });
    it("should run filter with socket (with roles and filters fields)", function() {
      var echoHelper = new EchoHelper(),
        socket = new SocketMock();
      echoHelper.sockets = [socket];
      echoHelper.filter = (socket, emitData) => {
        test.object(socket);
        test.object(socket.roles);
        test.object(socket.filters);
      };
      echoHelper.emit('action', {
        msg: 'msg'
      });
    });
    it("should run filter with correct emited data", function() {
      var echoHelper = new EchoHelper(),
        socket = new SocketMock(),
        called = false;
      echoHelper.sockets = [socket];
      echoHelper.filter = (socket, emitData) => {
        test.object(emitData);
        test.string(emitData.msg);
        test.assert(emitData.msg === 'msg');
      };
      echoHelper.emit('action', {
        msg: 'msg'
      });
    });
    it("emited data should be the same", function() {
      var echoHelper = new EchoHelper(),
        socket = new SocketMock();
      echoHelper.sockets = [socket];
      socket.on('action', (data) => {
        test.object(data);
        test.string(data.msg);
        test.assert(data.msg === 'msg');
      });
      echoHelper.emit('action', {
        msg: 'msg'
      });
    });
  });
});
