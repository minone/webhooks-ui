(function () {
    'use strict';

    angular.module('webhooks').controller('DestinationController', DestinationController);

    DestinationController.$inject = ['$scope', '$state'];

    function DestinationController($scope, $state, Config) {

        $scope.isGestorOuAdm = function() {
            return $scope.userInfo.perfis.indexOf('G') !== -1 || $scope.userInfo.perfis.indexOf('A') !== -1;
        }

        $scope.alterarSenha = function() {
            $state.go('root.senha-update');
        };
    }

})();