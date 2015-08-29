var echo = require("../lib/echo");

module.exports = function (config, logger, app, io, auth) {

    io.use(function (socket, next) {
        if (auth.auth(socket)) {
            logger.log("Login success");
            next();
        } else {
            logger.error("Authentication error");
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', function (socket) {
        var socketEcho, updateFilters;

        socketEcho = function (data) {
            if (auth.isWriteSocket(socket)) {
                logger.log("emit", data);
                echo.emit("read", data.action, data.data);
            } else {
                logger.log("user without role 'write' emit echo", socket);
            }
        };

        updateFilters = function (filters) {
            socket.filters = filters;
        };

        echo.addSocket(socket);
        socket.on('echo', socketEcho);
        socket.on('update_filters', updateFilters);
    });

    logger.log("socket module... started");
};
