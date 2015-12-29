'use strict';

module.exports = class SocketMock {
  constructor() {
    this._on = {};
    //should have special list of user roles
    this.roles = {};
    //should have filter map (filter_name => filter_parameters)
    this.filters = {};
  }

  on(name, fn){
    var rec = this._on[name];
    if(!(rec instanceof Array)){
      rec = this._on[name] = [];
    }
    if(typeof fn !== 'function'){
      throw 'SocketMock.on(name, fn): fn must be a function';
    }
    rec.push(fn);
  }

  emit(action, data){
    var el;
    if(this._on[action]){
      for(el of this._on[action]){
        el.apply(undefined, [data]);
      }
    }
  }

  $$emit(name, argsArray){
    var el;
    if(!this._on[name]) return false;
    for(el of this._on[name]){
      el.apply(argsArray);
    }
  }
};
