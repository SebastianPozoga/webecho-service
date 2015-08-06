var vanilia = require("./js/lib/vanilia"),
    main = require('./js/main'),
    args = {
        isDebug: false,
        configPath: "./config/config.json"
    }, i, config;

//decode arguments
for (i = 0; i < process.argv.length; i++) {
    if (process.argv[i] == "--debug") {
        args.isDebug = true;
    }
    if (vanilia.startsWith(process.argv[i], "--config")) {
        var arg = process.argv[i].split("=", 2);
        args.config = arg[1];
    }
}

//run
config = require(args.configPath);

if (args.isDebug) {
    config.debug = true;
    config.webdebug = true;
}

main(config);