'use strict';

angular.module('newappApp')
    .controller('EtudiantController', function ($http,$resource,$scope, $state, Etudiant, ParseLinks,$rootScope, $compile,DTOptionsBuilder, DTColumnBuilder) {

    	$scope.etudiants = [];
    	$scope.predicate = 'id';
    	$scope.reverse = true;
    	$scope.page = 1;

    	$scope.dtOptions = DTOptionsBuilder
    	.fromFnPromise(function() {
    		return $resource('api/etudiants').query().$promise; })
    		.withOption('bStateSave', true)
    		.withOption('createdRow', createdRow)
    		.withPaginationType('full_numbers')
    		.withOption('order', [])
    		.withDOM("<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>" +
    				"t" +
    		"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>")

    
    			$scope.dtColumns = [
    				DTColumnBuilder.newColumn('id').withTitle("id").withOption('width', '20%'),

    				DTColumnBuilder.newColumn('nom').withTitle("nom").withOption('width', '30%'),
    				DTColumnBuilder.newColumn('presnom').withTitle("presnom").withOption('width', '30%'),
    				DTColumnBuilder.newColumn('age').withTitle("age").withOption('width', '10%'),

    				DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width','7%')
    				.renderWith(actionsHtml)
    				];

//    	$rootScope.$on('$translateChangeSuccess', function () {
//    		$scope.dtOptions.withLanguageSource($translate.instant('global.datatable'));
//    		$scope.dtColumns = [
//    			DTColumnBuilder.newColumn('libelle').withTitle($translate.instant('erpcnssgaApp.Organismes.libelle')).withOption('width', '60%'),
//    			DTColumnBuilder.newColumn('abreviation').withTitle($translate.instant('erpcnssgaApp.Organismes.abreviation')).withOption('width', '33%'),
//    			DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().withOption('width','7%')
//    			.renderWith(actionsHtml)
//    			];
//    	});
    	
    	
    	function createdRow(row, data, dataIndex) {
    		$compile(angular.element(row).contents())($scope);
    	}

    	//Actions pour l'edition et la suppression

    	function actionsHtml(data, type, full, meta) {
    		$scope.etudiants[data.id] = data;

    		return '<div class="action-center" style="margin-top:0px">' +
    		' <div class="col-md-1"><a ui-sref="etudiant.edit({id:' + data.id + '})">' +
    		'   <i class="fa fa-pencil" style="font-size: 18px;color:#FF931D"></i> ' +
    		'</a></div>' +
    		'<div class="col-md-1"><a ui-sref="etudiant.delete({id:' + data.id + '})" )"="">' +
    		'   <i class="glyphicon glyphicon-trash" style="font-size:16px;color:#F31414"></i> ' +
    		'</a></div>'
    	}

    	$scope.dtInstance={};


});
