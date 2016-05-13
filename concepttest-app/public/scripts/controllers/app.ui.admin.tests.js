;(function() {
"use strict";

angular.module("app.ui.admin.tests", ['ui.sortable'])

	.controller("ListTests", ["$route", "$rootScope", "$scope", "$filter", "$window", "$timeout",
		function($route, $rootScope, $scope, $filter, $window, $timeout)
		{
			// Evaluaciones publicadas
			$scope.datas;
			$scope.searchKeywords;
			$scope.filteredData;
			$scope.numPerPageOpts;
			$scope.numPerPage;
			$scope.currentPage;
			$scope.currentPageStores;

			// Evaluaciones borrador
			$scope.datasDraft;
			$scope.searchKeywordsDraft;
			$scope.filteredDataDraft;
			$scope.numPerPageOptsDraft;
			$scope.numPerPageDraft;
			$scope.currentPageDraft;
			$scope.currentPageStoresDraft;

			getPublishedTests();

			function getPublishedTests()
			{
				/*
				questionService.getQuestions()
				.then(function(response)
				{
					$scope.datas = response.data;

					$scope.searchKeywords = "";
					$scope.filteredData = [];	
					$scope.row = "";

					$scope.numPerPageOpts = [5, 7, 10, 25, 50, 100];
					$scope.numPerPage = $scope.numPerPageOpts[1];
					$scope.currentPage = 1;
					$scope.currentPageStores = []; // data to hold per pagination


					$scope.select = function(page) {
						var start = (page - 1)*$scope.numPerPage,
							end = start + $scope.numPerPage;

						$scope.currentPageStores = $scope.filteredData.slice(start, end);
					}

					$scope.onFilterChange = function() {
						$scope.select(1);
						$scope.currentPage = 1;
						$scope.row = '';
					}

					$scope.onNumPerPageChange = function() {
						$scope.select(1);
						$scope.currentPage = 1;
					}

					$scope.onOrderChange = function() {
						$scope.select(1);
						$scope.currentPage = 1;
					}


					$scope.search = function() {
						$scope.filteredData = $filter("filter")($scope.datas, $scope.searchKeywords);
						$scope.onFilterChange();
					}

					$scope.order = function(rowName) {
						if($scope.row == rowName)
							return;
						$scope.row = rowName;
						$scope.filteredData = $filter('orderBy')($scope.datas, rowName);
						$scope.onOrderChange();
					}

					// init
					$scope.search();
					$scope.select($scope.currentPage);
				});
				*/
			}

			function getDraftTests()
			{

			}

			$scope.delete = function(id)
			{
				bootbox.confirm("¿Está seguro que desea eliminar la pregunta seleccionada?", function(result)
				{

				});
			}

		    $scope.edit = function(id)
		    {

		    };

		    function reload()
		    {
		    	$route.reload();
		    }
		}
	])

	.controller("NewTest", ["$rootScope", "$scope", "$filter",
		function($rootScope, $scope, $filter)
		{	
			$scope.steps = [true, false, false];

			$scope.availableQuestions = [];
			$scope.availableQuestions.push({id: '1', name: 'Pregunta 1'});
			$scope.availableQuestions.push({id: '2', name: 'Pregunta 2'});
			$scope.availableQuestions.push({id: '3', name: 'Pregunta 3'});
			$scope.availableQuestions.push({id: '4', name: 'Pregunta 4'});

			$scope.selectedQuestions = [];

			$scope.test = {
				description: '',
				questions: [],
			}

			$scope.stepNext = function(index) 
			{
				for(var i = 0; i < $scope.steps.length; i++) 
				{
					$scope.steps[i] = false;
				}

				$scope.steps[index] = true;
			}

			$scope.toConfiguration = function(index)
			{
				$scope.selected();

				if(!$scope.selectedQuestions.length == 0)
				{	
					for(var i = 0; i < $scope.steps.length; i++) 
					{
						$scope.steps[i] = false;
					}

					$scope.steps[index] = true;
				}
				else
				{
					toastr.warning('Debe seleccionar preguntas para la evaluaci&oacute;n');
				}
			}

			$scope.stepReset = function() 
			{
				$scope.steps = [true, false, false];
			}

			$scope.selected = function()
			{	
				$scope.selectedQuestions = [];
				for(var i in $scope.availableQuestions)
				{
					var question = $scope.availableQuestions[i];
					if(question.selected)
					{
						$scope.selectedQuestions.push(question);
					}
				}
			}
		}
	])

	.controller("EditTest", ["$rootScope", "$scope", "$routeParams",
		function($rootScope, $scope, $routeParams)
		{

		}
	])

}())