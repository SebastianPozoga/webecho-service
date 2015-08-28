module.exports = function (config, logger, app, io, auth) {

    io.on('connection', function (socket) {
        socket.on('echo', function (data) {
            if (auth.hasRole(socket, "write")) {
                logger.log("emit", data);
                io.emit(data.action, data.data);
            } else {
                logger.log("user without role group emit echo", socket);
            }
        });
    });

    logger.log("socket module... started");
};
