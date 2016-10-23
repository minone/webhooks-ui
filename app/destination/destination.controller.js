(function () {
    'use strict';

    angular.module('webhooks').controller('DestinationController', DestinationController);

    DestinationController.$inject = ['$scope', '$state'];

    function DestinationController($scope, $state) {

        $scope.destinations = [
            {id: 'Id1', url: 'http://locahost:8080'},
            {id: 'Id2', url: 'http://locahost:8081'}
        ];

        $scope.getDestinations = function () {

        };
    }

})();