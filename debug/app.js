angular.module('app', [])
    .controller('WebechoController', ['io', '$rootScope', function (io, $rootScope) {
        var that = this;
        that.started = false;

        that.filters = {
            actions: [],
            ids: []
        };

        that.addIdsFilter = function () {
            that.filters.ids.push(that.newIdsFilter);
            that.updateFilters();
            that.newIdsFilter = "";
        };

        that.removeIdsFilter = function (item) {
            that.filters.ids = that.filters.ids.filter(function (val) {
                return val != item;
            });
            that.updateFilters();
        };

        that.addActionFilter = function () {
            that.filters.actions.push(that.newActionFilter);
            that.updateFilters();
            that.newActionFilter = "";
        };

        that.removeActionFilter = function (item) {
            that.filters.actions = that.filters.actions.filter(function (val) {
                return val != item;
            });
            that.updateFilters();
        };

        that.updateFilters = function () {
            that.socket.emit('update_filters', that.filters);
        };

        that.clear = function () {
            that.list = [];
        };

        that.start = function () {
            that.socket = io.start(that.token);

            that.socket.onAll(function (action, data) {
                that.list.push({
                    date: new Date(),
                    data: {
                        action: action,
                        data: data
                    }
                });
                $rootScope.$apply();
            });

            that.started = true;
        };

        that.echoWithId = function () {
            that.socket.emit('echo', {
                action: that.action,
                data: {
                    id: that.id,
                    msg: that.msg
                }
            });

            that.msg = "";
        };

        that.echoWithoutId = function () {
            that.socket.emit('echo', {
                action: that.action,
                data: {
                    msg: that.msg
                }
            });

            that.msg = "";
        };

        that.clear();
    }])
    .controller('WebechoController', ['echoRest', function (echoRest) {
        var that = this;

        that.rest = function () {
            that.form = {
                action: 'message',
                data: {
                    msg: "example message"
                }
            };
        };

        that.send = function () {
            echoRest.postEcho(that.form);
            that.rest();
        };

        that.rest();
    }])
    .service('io', [function () {
        var api = {};

        api.start = function (token) {
            var superEmit, socket, onAllFn;

            socket = io({
                query: 'token=' + token
            });

            socket.onAll = function (cb) {
                onAllFn = cb;
            };

            superEmit = socket.onevent;
            socket.onevent = function () {
                if (onAllFn) {
                    onAllFn.apply(this, arguments);
                }
                superEmit.apply(this, arguments);
            };

            return socket;
        };

        return api;
    }])
    .service('echoRest', ['$http', function ($http) {
        var api = {};

        api.postEcho = function (postObject) {
            return $http.post("/rest/echo", postObject);
        };

        return api;
    }]);