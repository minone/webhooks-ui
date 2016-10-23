(function () {
    'use strict';

    angular.module('webhooks').config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl : "home.html",
                controller: "HomeController"
            });
    }
})();