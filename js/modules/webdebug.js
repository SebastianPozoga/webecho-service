var express = require('express');

module.exports = function (config, logger, app, io) {
    app.use('/rest/echo', express.static('debug/rest/index.html'));

    app.use('/', express.static('debug'));

    logger.log("webdebug module... started");
};
