'use strict';

module.exports.Logger = class Logger {

  constructor(){
    console.log('----------------------');
    console.log('----- Start app ------');
    console.log('----------------------');
  }

  log(msg, args) {
      var i, out = [], argstr = '', str;
      if (args) {
          for (i = 0; i < args.length; i++) {
              out.push(JSON.stringify(args[i]));
          }
          argstr = ' ' + out.join(', ');
      }
      str = ' *[' + new Date() + '] ' + msg + argstr;
      console.log(str);
      return str;
  };

  error(msg, args) {
      return this.log(' ERRROR: ' + msg, args);
  }

  critic(msg, args) {
      this.log(' CRITIC: ' + msg, args);
      throw msg;
  }

}

module.exports.logger = new module.exports.Logger();
