var sockets = {};

module.exports.addSocket = function (socket) {
    sockets[socket.id] = socket;

    socket.on('disconnect', function () {
        module.exports.removeSocket(socket);
    });
};

module.exports.removeSocket = function (socket) {
    sockets = sockets.filter(function (e) {
        return e.id != socket.id;
    });
};

module.exports.removeSocket = function (socket) {
    var newsockets = {};
    for (var i in sockets) {
        if (i != socket.id) {
            newsockets[i] = socket;
        }
    }
    sockets = newsockets;
};

module.exports.emit = function (role, action, data) {
    var socket, emitData = {
        action: action,
        data: data,
        role: role
    };
    for (var i in sockets) {
        socket = sockets[i];
        if (module.filter(socket.roles || [], socket.filters || {}, emitData)) {
            socket.emit(action, data);
        }
    }
};

module.filter = function (roles, filter, emitData) {
    if (!module.filterDataRole(roles, emitData)) return false;
    if (filter.actions && filter.actions.length > 0 && !module.filterDataActions(filter.actions, emitData)) return false;
    if (filter.ids && filter.ids.length > 0 && !module.filterDataIds(filter.ids, emitData)) return false;
    return true;
};

module.filterDataRole = function (roles, emitData) {
    for (var i = 0; i < roles.length; i++) {
        if (roles[i] === emitData.role) {
            return true;
        }
    }
    return false;
};

module.filterDataActions = function (actions, emitData) {
    for (var i = 0; i < actions.length; i++) {
        if (actions[i] === emitData.action) {
            return true;
        }
    }
    return false;
};

module.filterDataIds = function (ids, emitData) {
    var id = emitData.data.id;
    if (!id) return true;

    //filter by data id
    for (var i = 0; i < ids.length; i++) {
        if (ids[i] === id) {
            return true;
        }
    }
    return false;
};