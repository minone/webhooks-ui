(function () {
    'use strict';

    angular.module('webhooks').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope'];

    function HomeController($scope) {

        var database = firebase.database();

        $scope.destinations = [
            {
                id: 'Id1',
                url: 'http://locahost:8080',
                contentType: 'text/html',
                secret: 'guid'
            },
            {
                id: 'Id1',
                url: 'http://locahost:8080',
                contentType: 'text/html',
                secret: 'guid'
            }];

        $scope.logs = [];

        $scope.getDestinations = function () {

        };

        $scope.read = function () {

        };

        $scope.gravar = function () {
            database.ref('log/1').set({value: 'testando evento 1'});
        };

        $scope.gravar2 = function () {
            database.ref('log/2').set({value: 'testando evento 2'});
        };


        var logRef = firebase.database().ref('log/');

        logRef.on('child_added', function (data) {
            var logEntry = data.val();

            $scope.logs.push({entry: logEntry.value});
        });

    }

})();