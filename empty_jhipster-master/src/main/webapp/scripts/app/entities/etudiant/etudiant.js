'use strict';

angular.module('newappApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('etudiant', {
                parent: 'entity',
                url: '/etudiants',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Etudiants'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/etudiant/etudiants.html',
                        controller: 'EtudiantController'
                    }
                },
                resolve: {
                }
            })
            .state('etudiant.detail', {
                parent: 'entity',
                url: '/etudiant/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Etudiant'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/etudiant/etudiant-detail.html',
                        controller: 'EtudiantDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Etudiant', function($stateParams, Etudiant) {
                        return Etudiant.get({id : $stateParams.id});
                    }]
                }
            })
            .state('etudiant.new', {
                parent: 'etudiant',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/etudiant/etudiant-dialog.html',
                        controller: 'EtudiantDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    nom: null,
                                    presnom: null,
                                    age: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('etudiant', null, { reload: true });
                    }, function() {
                        $state.go('etudiant');
                    })
                }]
            })
            .state('etudiant.edit', {
                parent: 'etudiant',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/etudiant/etudiant-dialog.html',
                        controller: 'EtudiantDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Etudiant', function(Etudiant) {
                                return Etudiant.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('etudiant', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('etudiant.delete', {
                parent: 'etudiant',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/etudiant/etudiant-delete-dialog.html',
                        controller: 'EtudiantDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Etudiant', function(Etudiant) {
                                return Etudiant.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('etudiant', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
