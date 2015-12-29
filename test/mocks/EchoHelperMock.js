'use strict';

module.exports = class EchoHelperMock {

  constructor(){
    this.$$emited = false;
  }

  emit() {
    this.$$emited = true;
  }

};
