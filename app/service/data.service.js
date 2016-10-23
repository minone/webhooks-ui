(function () {
    'use strict';

    angular.module('webhooks').factory('DataService', DataService);

    DataService.$inject = ['$http', 'Config'];

    function DataService($http, Config) {

        var service = {};

        service.getDestinations = getDestinations;
        
        service.registerDestination = registerDestination;

        service.deleteDestination = deleteDestination;
        
        service.postMessage = postMessage;
        
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
        
        function deleteDestination(destinationId, callback) {
        	$http.delete(Config.apiUrl + '/destination/' + destinationId).then(callback);
        }
        
        function postMessage(destinationId, contentType, content, callback) {
        	
        	var command = {
                    destinationId: destinationId,
                    contentType: contentType,
                    content: content
                };
        	
        	var config = {
        			 headers: {'Content-MD5': 'md5'}
        	};
        	
        	$http.post(Config.apiUrl + '/post-message/', command, config).then(callback);
        }

    }
})();