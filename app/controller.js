(function () {
    'use strict';

    angular.module('webhooks').controller('HomeController', HomeController);

    HomeController.$inject = ['DataService', '$injector', '$uibModal'];

    function HomeController(DataService, $injector, $uibModal) {

        var database = firebase.database();

        var self = this;

        self.destinations = [];

        self.destination = {
            url: '',
            contentType: ''
        };

        self.validDestination = {
            id: '39a2c7d8-fd0f-4ae2-b1f4-1519c79cb895',
            url: 'http://segurobox.32sasmbbfa.us-west-2.elasticbeanstalk.com/webhooks/callback',
            contentType: 'text/html',
            secret: '70545a77-703b-4696-85ba-70948c6006c6'
        };

        self.invalidDestination = {
            id: '56bb3e84-21c9-4fca-acbb-1bb2d4b836e0',
            url: 'http://segurobox.32sasmbbfa.us-west-2.elasticbeanstalk.com/webhooks/doesnotexists',
            contentType: 'text/html',
            secret: '58ca75ed-bb47-4127-89c2-d4ac5253c883'
        };

        self.logs = [];

        self.postDefaultMessage = function (destination) {

            var defaultMessage = 'default message';

            DataService.postMessage(destination.id, destination.contentType, defaultMessage, destination.secret, function () {
                var toastr = $injector.get('toastr');
                toastr.success('Post executed. See the log entry.');
            });

        };

        self.getDestinations = function () {

            DataService.getDestinations(function (response) {

                self.destinations = [];

                for (var i = 0; i < response.data.length; i++) {

                    if (response.data[i].id !== self.validDestination.id && response.data[i].id !== self.invalidDestination.id) {

                        self.destinations.push(response.data[i]);

                    }

                }

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

        var logRef = database.ref('log/');

        self.deleteLog = function () {
            logRef = database.ref('log/');
            logRef.remove();
            var logView = document.querySelector('#logView');

            logView.innerHTML = '';
        };

        logRef.on('child_added', function (data) {

            var logEntry = data.val();
            var logView = document.querySelector('#logView');

            logView.innerHTML = logView.innerHTML + '</br>' + logEntry.value;
        });

    }

})();