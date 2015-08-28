var express = require('express');

module.exports = function (config, logger, app, io) {
    app.use('/', express.static('debug'));
    
    logger.log("webdebug module... started");
};
