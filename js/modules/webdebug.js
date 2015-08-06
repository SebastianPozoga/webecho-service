var express = require('express');

module.exports = function (config, logger, gpio, app, io) {
    app.use('/', express.static('debug'));

    logger.log("webdebug module... started");
};
