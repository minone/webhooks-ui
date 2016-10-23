(function () {
    'use strict';

    angular.module('webhooks', ['ngRoute', 'ngCookies', 'ngAnimate', 'ngResource',
        'angular-loading-bar', 'toastr', 'ngMessages']);

    angular.module('webhooks').config(config);

    config.$inject = ['$httpProvider', 'cfpLoadingBarProvider', '$compileProvider'];

    function config($httpProvider, cfpLoadingBarProvider, $compileProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;

        cfpLoadingBarProvider.includeSpinner = false;

        $compileProvider.debugInfoEnabled(false);

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);

    }

})();