;(function() {
"use strict";

angular.module("app.ui.admin.tests", ['ui.sortable'])

	.controller("ListTests", ["$route", "$rootScope", "$scope", "$filter", "$window", "$timeout", "testService",
		function($route, $rootScope, $scope, $filter, $window, $timeout, testService)
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
			getDraftTests();

			function getPublishedTests()
			{
				testService.getActiveTests()
				.then(function(response)
				{
					$scope.datas = response.data;

					$scope.searchKeywords = "";
					$scope.filteredData = [];	
					$scope.row = "";

					$scope.numPerPageOpts = [5, 7, 10, 25, 50, 100];
					$scope.numPerPage = $scope.numPerPageOpts[2];
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
			}

			function getDraftTests()
			{
				testService.getInactiveTests()
				.then(function(response)
				{
					$scope.datasDraft = response.data;

					$scope.searchKeywordsDraft = "";
					$scope.filteredDataDraft = [];	
					$scope.rowDraft = "";

					$scope.numPerPageOptsDraft = [5, 7, 10, 25, 50, 100];
					$scope.numPerPageDraft = $scope.numPerPageOptsDraft[1];
					$scope.currentPageDraft = 1;
					$scope.currentPageStoresDraft = []; // data to hold per pagination


					$scope.selectDraft = function(page) {
						var start = (page - 1)*$scope.numPerPageDraft,
							end = start + $scope.numPerPageDraft;

						$scope.currentPageStoresDraft = $scope.filteredDataDraft.slice(start, end);
					}

					$scope.onFilterChangeDraft = function() {
						$scope.selectDraft(1);
						$scope.currentPageDraft = 1;
						$scope.rowDraft = '';
					}

					$scope.onNumPerPageChangeDraft = function() {
						$scope.selectDraft(1);
						$scope.currentPageDraft = 1;
					}

					$scope.onOrderChangeDraft = function() {
						$scope.selectDraft(1);
						$scope.currentPageDraft = 1;
					}


					$scope.searchDraft = function() {
						$scope.filteredDataDraft = $filter("filter")($scope.datasDraft, $scope.searchKeywordsDraft);
						$scope.onFilterChangeDraft();
					}

					$scope.orderDraft = function(rowName) {
						if($scope.rowDraft == rowName)
							return;
						$scope.rowDraft = rowName;
						$scope.filteredDataDraft = $filter('orderBy')($scope.datasDraft, rowName);
						$scope.onOrderChangeDraft();
					}

					// init
					$scope.searchDraft();
					$scope.selectDraft($scope.currentPageDraft);
				});
			}

			$scope.delete = function(id)
			{
				bootbox.confirm("¿Está seguro que desea eliminar la evaluaci&oacute;n seleccionada?", function(result)
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

	.controller("NewTest", ["$rootScope", "$scope", "$filter", "questionService", "testService",
		function($rootScope, $scope, $filter, questionService, testService)
		{	
			$scope.steps = [true, false];
			$scope.types;
			$scope.availableQuestions
			$scope.selectedQuestions = [];

			$scope.test = {
				questions: [],
			}

			$scope.getAvailableQuestions = function()
			{
				questionService.getQuestions()
				.then(function(response)
				{
					$scope.availableQuestions = response.data;
				});
			}

			$scope.getTestTypes = function()
			{
				testService.getTestTypes()
				.then(function(response)
				{
					$scope.types = response.data;
				});
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

			$scope.showPreview = false;
			$scope.preview = function(index)
			{	
				$scope.test.questions = $scope.selectedQuestions;
				$rootScope.$emit('handlePreviewTest', { test: $scope.test} );
				$scope.showPreview = !$scope.showPreview;
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

			$scope.showDetail = false;
			$scope.selectedQuestion;
			$scope.showQuestionDetail = function(index)
			{
				$scope.showDetail = !$scope.showDetail;
				$scope.selectedQuestion = $scope.selectedQuestions[index];
			}

			$scope.save = function(isValid)
			{
				if(isValid)
				{
					$scope.test.questions = $scope.selectedQuestions;
					console.log(angular.toJson($scope.test));
					
					testService.createTest($scope.test)
					.then(function(response)
					{
						toastr.success('Registro satisfactorio');
						// REDIRECCIONAR
					});
				}
			}

			// Init
			$scope.getTestTypes();
			$scope.getAvailableQuestions();
		}
	])

	.controller("EditTest", ["$rootScope", "$scope", "$routeParams",
		function($rootScope, $scope, $routeParams)
		{

		}
	])

	.controller("PreviewTest", ["$rootScope", "$scope", "$filter",
		function($rootScope, $scope, $filter)
		{
			$scope.datas;
			$scope.searchKeywords;
			$scope.filteredData;
			$scope.numPerPageOpts;
			$scope.numPerPage;
			$scope.currentPage;
			$scope.currentPageStores;

			$scope.previewTest = function()
			{
				console.log(angular.toJson($scope.datas));
				$scope.searchKeywords = "";
				$scope.filteredData = [];	
				$scope.row = "";

				$scope.numPerPageOpts = [1];
				$scope.numPerPage = $scope.numPerPageOpts[0];
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
			}


			$rootScope.$on('handlePreviewTest', function(event, params)
			{
				$scope.datas = params.test.questions;
				$scope.previewTest();
			});
		}
	])

	.factory('testService', ['$http', function($http)
	{
		var baseUrl = 'http://localhost:8082/api/test';
		var dataFactory = [];

		dataFactory.getTests = function()
		{
			return $http.get(baseUrl);
		}

		dataFactory.getTestTypes = function()
		{
			return $http.get(baseUrl + '/types/all');
		}

		dataFactory.getActiveTests = function()
		{
			return $http.get(baseUrl + '/state/active');
		}

		dataFactory.getInactiveTests = function()
		{
			return $http.get(baseUrl + '/state/inactive');
		}

		dataFactory.createTest = function(test)
		{
			return $http.post(baseUrl, test);
		}

		dataFactory.updateTest = function(test)
		{
			return $http.put(baseUrl + '/' + test._id, test);
		}

		dataFactory.deleteTest = function(testId)
		{
			return $http.delete(baseUrl + '/' + testId);
		}

		return dataFactory;
	}])
}())