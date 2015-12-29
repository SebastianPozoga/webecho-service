'use strict';

module.exports = class EchoHelper {
  constructor() {
    this.sockets = [];
    this.filter = (roles, filters, emitData) => {
      return true;
    };
  }

  addSocket(socket) {
    var that = this;
      this.sockets.push(socket);
      socket.on('disconnect', function () {
          that.removeSocket(socket);
      });
  };

  removeSocket(socket) {
      this.sockets = this.sockets.filter(function (e) {
          return e.id != socket.id;
      });
  };

  emit(action, data) {
      var socket, emitData = {
          action: action,
          data: data
      };
      for (var i in this.sockets) {
          socket = this.sockets[i];
          if (this.filter(socket, data)) {
              socket.emit(action, data);
          }
      }
  };

}
