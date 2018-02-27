'use strict';

angular.module('newappApp').controller('EtudiantDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Etudiant',
        function($scope, $stateParams, $uibModalInstance, entity, Etudiant) {

        $scope.etudiant = entity;
        $scope.load = function(id) {
            Etudiant.get({id : id}, function(result) {
                $scope.etudiant = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('newappApp:etudiantUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.etudiant.id != null) {
                Etudiant.update($scope.etudiant, onSaveSuccess, onSaveError);
            } else {
                Etudiant.save($scope.etudiant, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
