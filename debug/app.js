angular.module('app', [])
    .controller('GpioController', ['$scope', 'io', function ($scope, io) {
        $scope.list = [];

        io.on('change', function (data) {
            $scope.list.push({
                port: data.port,
                value: data.value,
                date: new Date()
            });
            $scope.$apply();
        });
    }])
    .service('io', [function () {
        return io();
    }]);