module.exports = function (config, logger, app, io, auth) {

    io.on('connection', function (socket) {
        if (auth.hasRole("write")) {
            socket.on('echo', function (data) {
                io.emit(data.action, data.data);
            });
        } else {
            logger.log("user without role group emit echo", [data]);
        }
    });

    logger.log("socket module... started");
};
