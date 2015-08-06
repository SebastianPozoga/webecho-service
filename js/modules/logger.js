module.exports.log = function (msg, args) {
    var i, out = [], argstr = "", str;
    if (args) {
        for (i = 0; i < args.length; i++) {
            out.push(JSON.stringify(args[i]));
        }
        argstr = " " + out.join(", ");
    }
    str = " *[" + new Date() + "] " + msg + argstr;
    console.log(str);
    return str;
};

module.exports.error = function (msg, args) {
    return module.exports.log(" ERRROR: " + msg, args);
};

module.exports.critic = function (msg, args) {
    throw module.exports.log(" CRITIC: " + msg, args);
};


console.log("----------------------");
console.log("----- Start app ------");
console.log("----------------------");
