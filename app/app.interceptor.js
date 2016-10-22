(function () {
    'use strict';

    angular.module('webhooks').factory('ApiInterceptor', ApiInterceptor);

    ApiInterceptor.$inject = ['Config', '$q', '$injector'];

    function ApiInterceptor(Config, $q, $injector) {

        var interceptor = {};

        interceptor.request = request;

        interceptor.responseError = responseError;

        interceptor.response = response;

        return interceptor;

        function request(requestCofig) {
            return requestCofig;
        }

        function responseError(rejection) {

            if (rejection.status === 400) {
                var toastr = $injector.get('toastr');

                toastr.error(rejection.data.error, 'Error');
            }

            return $q.reject(rejection);
        }

        function response(res) {

            if (res.config.method === 'POST' || res.config.method === 'PUT') {

            }

            return res;
        }
    }

    angular.module('webhooks').config(configInterceptor);

    configInterceptor.$inject = ['$httpProvider'];

    function configInterceptor($httpProvider) {
        $httpProvider.interceptors.push('ApiInterceptor');
    }

})();
