'use strict';

angular.module('newappApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


