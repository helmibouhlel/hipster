'use strict';

angular.module('newappApp')
	.controller('EtudiantDeleteController', function($scope, $uibModalInstance, entity, Etudiant) {

        $scope.etudiant = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Etudiant.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
