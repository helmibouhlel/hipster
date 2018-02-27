'use strict';

angular.module('newappApp')
    .controller('EtudiantDetailController', function ($scope, $rootScope, $stateParams, entity, Etudiant) {
        $scope.etudiant = entity;
        $scope.load = function (id) {
            Etudiant.get({id: id}, function(result) {
                $scope.etudiant = result;
            });
        };
        var unsubscribe = $rootScope.$on('newappApp:etudiantUpdate', function(event, result) {
            $scope.etudiant = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
