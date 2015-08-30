module.exports = function (config, logger, app, io) {
    var api = {};

    api.auth = function (socket) {
        var token = socket.handshake.query.token,
            row = api.getTokenRow(token);
        if (!row) return false;
        socket.roles = row.roles;
        socket.filters = row.filters;
        logger.log("auth", row);
        return true;
    };

    api.getTokenRow = function (token) {
        for (var i in config.tokens) {
            if (config.tokens[i].token == token) {
                return config.tokens[i];
            }
        }
        logger.error("No find token");
        return false;
    };

    api.tokenHasRole = function (token, role) {
        var row = api.getTokenRow(token);
        if (!row) return false;
        for (var i in row.roles) {
            if (row.roles[i] == role) return true;
        }
        return false;
    };

    api.socketHasRole = function (socket, role) {
        var roles = socket.roles;
        if (!roles) return false;
        for (var i in roles) {
            if (roles[i] == role) return true;
        }
        return false;
    };

    api.isWriteToken = function (token) {
        return api.tokenHasRole(token, "write");
    };

    api.isWriteSocket = function (socket) {
        return api.socketHasRole(socket, "write");
    };

    logger.log("auth module... started");
    return api;
};
