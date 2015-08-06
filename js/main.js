module.exports = function (config) {
    var app = require('express').createServer(),
        io = require('socket.io')(app),
        logger = require("./modules/logger"),
        auth = require("./modules/auth")(config, logger, app, io),
        socket = require("./modules/socket")(config, logger, app, io, auth),
        webDebug;

    if (config.webdebug == true) {
        webDebug = require("./modules/webdebug")(config, logger, app, io);
    }

    logger.log("echo server started", [config]);
};
