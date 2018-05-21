'use strict';

angular.module('newappApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                parent: 'site',
                url: '/',
                data: {
                    authorities: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/main/main.html',
                        controller: 'MainController'
                    }
                },
                resolve: {
                    
                }
            })
            .state('scan', {
                parent: 'site',
                url: '/scan',
                data: {
                    authorities: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/main/scan.html',
                        controller: 'ScanController'
                    }
                },
                resolve: {
                    
                }
            })
             .state('scanAngular', {
                parent: 'site',
                url: '/scanAngular',
                data: {
                    authorities: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/main/scanAngular.html',
                        controller: 'ScanAngularController'
                    }
                },
                resolve: {
                    
                }
            })
            ;
    });
