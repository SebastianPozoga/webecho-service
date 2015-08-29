module.exports = function (config) {
    var app = require('express')(),
        server = require('http').Server(app),
        io = require('socket.io')(server),

        logger = require("./modules/logger"),
        auth = require("./modules/auth")(config, logger, app, io),
        socket = require("./modules/socket")(config, logger, app, io, auth),
        rest = require("./modules/rest")(config, logger, app, io, auth),
        webDebug;

    if (config.webdebug == true) {
        webDebug = require("./modules/webdebug")(config, logger, app, io);
    }

    server.listen(config.port);
    logger.log("echo server started", [config]);
};
