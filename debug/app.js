angular.module('app', [])
    .controller('WebechoController', ['io', '$rootScope', function (io, $rootScope) {
        var that = this;
        that.started = false;

        that.clear = function () {
            that.list = [];
        };

        that.start = function () {
            that.io = io.start(that.token);

            that.io.on('change', function (data) {
                that.list.push({
                    date: new Date(),
                    data: data
                });
                $rootScope.$apply();
            });

            that.started = true;
        };

        that.write = function (token) {
            that.io.emit('echo', {
                action: 'change',
                data: {
                    msg: that.msg
                }
            });

            that.msg = "";
        };

        that.clear();
    }])
    .service('io', [function () {
        var api = {};

        api.start = function (token) {
            api.io = io('http://localhost:8191', {
                query: 'token=' + token
            });
            return api.io;
        };

        return api;
    }]);