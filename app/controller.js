(function () {
    'use strict';

    angular.module('webhooks').controller('HomeController', HomeController);

    HomeController.$inject = ['DataService', '$injector', '$uibModal'];

    function HomeController(DataService, $injector, $uibModal) {

        var database = firebase.database();

        var self = this;

        self.destination = {
            url: '',
            contentType: ''
        };

        self.logs = [];


        self.getDestinations = function () {
            DataService.getDestinations(function (response) {
                self.destinations = response.data;
            });
        };

        self.getDestinations();


        self.register = function () {
            DataService.registerDestination(self.destination, function () {
                var toastr = $injector.get('toastr');
                toastr.success('Destination registered successfully.');
                self.getDestinations();
            });
        };

        self.deleteDestination = function (destinationId) {
            DataService.deleteDestination(destinationId, function () {
                var toastr = $injector.get('toastr');
                toastr.success('Destination deleted successfully.');
                self.getDestinations();
            });
        };
        
        self.openModalPostMessage = function (destination) {
        	
            var modalInstance = $uibModal.open({
                animation: false,
                templateUrl: 'postMessage.html',
                controller: 'PostMessageController',
                controllerAs: 'controller',
                backdrop: 'static',
                size: 'md',
                resolve: {
                	destination: function () {
                        return destination;
                    }
                }
            });
            
            modalInstance.result.then(function () {
                var toastr = $injector.get('toastr');
                toastr.success('Post executed successfully.');

            });
        };

        self.read = function () {

        };

        self.gravar = function () {

            for (var i = 1; i <= 50; i++) {
                database.ref('log/' + i).set({value: 'testando evento ' + i});
            }
        };

        self.gravar2 = function () {
            database.ref('log/2').set({value: 'testando evento 2'});
        };


        var logRef = database.ref('log/');

        logRef.on('child_added', function (data) {

            var logEntry = data.val();
            var logView = document.querySelector('#logView');

            console.log(logEntry.value);

            logView.innerHTML = logView.innerHTML + '</br>' + logEntry.value;
        });

    }

})();