;(function() {
"use strict";

angular.module("app.ui.admin.projects", [])

	.controller("ListProjects", ["$route", "$rootScope", "$scope", "$filter", "$window", "$timeout", "$location",
		function($route, $rootScope, $scope, $filter, $window, $timeout, $location)
		{
			$scope.datas;
			$scope.searchKeywords;
			$scope.filteredData;
			$scope.numPerPageOpts;
			$scope.numPerPage;
			$scope.currentPage;
			$scope.currentPageStores;

			function getProjects()
			{
				/*
				skillService.getSkills()
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

			$scope.delete = function(id)
			{
				bootbox.confirm("¿Está seguro que desea eliminar el requerimiento seleccionado?", function(result)
				{
					if(result)
					{
						/*
						skillService.deleteSkill(id)
						.then(function(response)
						{
							toastr.success('Registro eliminado.');
							reload();
						});
						*/
					}
				});
			}

			$scope.showNew = false;
		    $scope.toggleNew = function()
		    {
		        $scope.showNew = !$scope.showNew;
		    };

			$scope.showEdit = false;
		    $scope.toggleEdit = function(id)
		    {
		        $scope.showEdit = !$scope.showEdit;
		        $rootScope.$emit('handleEditProject', { id: id} );
		    };

		    function reload()
		    {
		    	$route.reload();
		    }

		    $rootScope.$on('closeNewProjectModal', function(event, params)
		    {
		    	$scope.showNew = !$scope.showNew
		    	$timeout(reload, 800);
		    });

		    $rootScope.$on('closeEditProjectModal', function(event, params)
		    {
		    	$scope.showEdit = !$scope.showEdit
		    	$timeout(reload, 800);
		    });
		}
	])

	.controller("NewProject", ["$rootScope", "$scope", "$window",
		function($rootScope, $scope, $window)
		{
			$scope.init = function()
			{

			}

			$scope.save = function(isValid)
			{
				if(isValid)
				{

				}
			}
		}
	])

	.controller("EditProject", ["$rootScope", "$scope", "$routeParams", "$window",
		function($rootScope, $scope, $routeParams, $window)
		{
			$scope.init = function()
			{
						
			}

			$scope.save = function(isValid)
			{
				if(isValid)
				{

				}
			}
		}
	])

}())