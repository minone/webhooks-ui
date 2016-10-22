(function () {
    'use strict';

    angular.module('webhooks').config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/root");

        $stateProvider
            .state('destination', {
                url: '/destination',
                templateUrl: 'destination/destination.list.html',
                controller: 'DestinationController'
            })
            .state('root', {
                url: '/home',
                templateUrl: 'home.html'
            });
    }
})();