module.exports = function (config, logger, app, io) {
    var api = {};

    api.auth = function (socket) {
        console.log("socket.handshake.query", socket.handshake.query);
        var token = socket.handshake.query.token;
        for (var i in config.tokens) {
            if (config.tokens[i].token == token) {
                socket.auth = config.tokens[i];
                logger.log("auth", config.tokens[i]);
                return true;
            }
        }
        return null;
    };

    api.hasRole = function (socket, role) {
        for (var i in socket.auth.role) {
            if (socket.auth.role[i] == role) return true;
        }
        return false;
    };

    io.use(function (socket, next) {
        if (api.auth(socket)) {
            logger.log("Login success");
            next();
        } else {
            logger.error("Authentication error");
            next(new Error('Authentication error'));
        }
    });

    logger.log("auth module... started");
    return api;
};
