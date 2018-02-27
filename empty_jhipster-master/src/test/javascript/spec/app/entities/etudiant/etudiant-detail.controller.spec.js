'use strict';

describe('Controller Tests', function() {

    describe('Etudiant Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockEtudiant;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockEtudiant = jasmine.createSpy('MockEtudiant');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Etudiant': MockEtudiant
            };
            createController = function() {
                $injector.get('$controller')("EtudiantDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'newappApp:etudiantUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
