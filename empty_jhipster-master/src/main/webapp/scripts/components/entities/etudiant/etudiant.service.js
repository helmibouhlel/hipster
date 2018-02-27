'use strict';

angular.module('newappApp')
    .factory('Etudiant', function ($resource, DateUtils) {
        return $resource('api/etudiants/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
