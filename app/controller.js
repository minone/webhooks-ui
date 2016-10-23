(function () {
    'use strict';

    angular.module('webhooks').controller('HomeController', HomeController);

    HomeController.$inject = ['DataService', '$injector'];

    function HomeController(DataService, $injector) {

        var database = firebase.database();
        
        var self = this;
        
        self.destination = {
        		url: '',
        		contentType: ''
        }
        
       self.destinations = [
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

        self.logs = [];

        self.getDestinations = function () {
        	DataService.getDestinations(function(response) {
        		self.destinations = response.data;
        	});
        };
        
        self.register = function() {
        	DataService.registerDestination(self.destination, function() {
        		var toastr = $injector.get('toastr');
                toastr.success('Destination registered successfully.');
                self.getDestinations();
        	});
        };

        self.read = function () {

        };

        self.gravar = function () {
            database.ref('log/1').set({value: 'testando evento 1'});
        };

        self.gravar2 = function () {
            database.ref('log/2').set({value: 'testando evento 2'});
        };


        var logRef = firebase.database().ref('log/');

        logRef.on('child_added', function (data) {
            var logEntry = data.val();

            self.logs.push({entry: logEntry.value});
        });

    }

})();