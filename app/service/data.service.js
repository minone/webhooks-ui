(function () {
    'use strict';

    angular.module('webhooks').factory('DataService', DataService);

    DataService.$inject = ['$http', 'Config'];

    function DataService($http, Config) {

        var service = {};

        service.getDestinations = getDestinations;
        service.registerDestination = registerDestination;

        return service;

        function getDestinations(callback) {
            $http.get(Config.apiUrl + '/destination').then(callback);
        }

        function registerDestination(destination, callback) {

            var command = {
                url: destination.url,
                contentType: destination.contentType
            };

            $http.post(Config.apiUrl + '/destination', command).then(callback);
        }

    }
})();