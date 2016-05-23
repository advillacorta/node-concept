;(function() {
"use strict";

angular.module("app.ui.mytests", ['ui.sortable'])

	.controller("ListMyTests", ["$route", "$rootScope", "$scope", "$filter", "$window", "$timeout", "testService",
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

			// Test types
			$scope.types;

			$scope.selectedTest;

			getTestTypes();
			getPublishedTests();

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

			function getTestTypes()
			{
				testService.getTestTypes()
				.then(function(response)
				{
					$scope.types = response.data;
				});
			}

			$scope.selectType = function(id)
			{
				testService.getTestsByType(id)
				.then(function(response)
				{
					$scope.datas = response.data;

					// Update list
					$scope.search();
					$scope.select($scope.currentPage);
				});
			}

			$scope.continue = function()
			{
				$scope.toggleIntro($scope.selectedTest);
				$scope.toggleTest();
				$rootScope.$emit('handleTakeTest', { id: $scope.selectedTest } );
			}

			$scope.showIntro = false;
		    $scope.toggleIntro = function(id)
		    {
		        $scope.showIntro = !$scope.showIntro;
		        $scope.selectedTest = id;
		    };

			$scope.showTest = false;
		    $scope.toggleTest = function(id)
		    {
		        $scope.showTest = !$scope.showTest;
		    };

		    $rootScope.$on('closeTest', function(event, params)
		    {
		    	$scope.toggleTest();
		    	$timeout(reload, 800);
		    });

		    function reload()
		    {
		    	$route.reload();
		    }
		}
	])

	.controller("TakeTest", ["$route", "$rootScope", "$scope", "$filter", "$window", "$timeout", "testService",
		function($route, $rootScope, $scope, $filter, $window, $timeout, testService)
		{
			// Evaluacion seleccionada
			$scope.datas;
			$scope.searchKeywords;
			$scope.filteredData;
			$scope.numPerPageOpts;
			$scope.numPerPage;
			$scope.currentPage;
			$scope.currentPageStores;

			function getSelectedTest(id)
			{
				testService.getTest(id)
				.then(function(response)
				{
					$scope.datas = response.data.questions;

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
				});
			}

			$scope.cancel = function()
			{
				console.log("Cancel");
				bootbox.confirm("¿Está seguro que desea cancelar la evaluaci&oacute;n?", function(result)
				{
					if(result)
					{
						$rootScope.$emit('closeTest', {} );
					}
				});
			}

			$scope.finish = function()
			{
				console.log("Finish");
				bootbox.confirm("¿Está seguro que desea finalizar la evaluaci&oacute;n?", function(result)
				{
					if(result)
					{
						$rootScope.$emit('closeTest', {} );
					}
				});
			}

			$rootScope.$on('handleTakeTest', function(event, params)
			{
				var id = params.id;

				getSelectedTest(id);
			});
		}
	])
}())