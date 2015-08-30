var bodyParser = require("body-parser"),
    echo = require("../lib/echo");

module.exports = function (config, logger, app, io, auth) {
    app.use(bodyParser.json());

    app.post('/rest/echo', function (req, res) {
        var token = req.body.token;
        if (!auth.isWriteToken(token)) {
            logger.error("Token " + token + " can not write");
            res.json({status: 'error'}, 403);
            return;
        }
        res.json({status:'ok'});
        echo.emit("read", req.body.action, req.body.data);
    });

    logger.log("rest module... started");
};
