;(function() {
"use strict";

angular.module("app.ui.admin.teams", [])

	.controller("ListTeams", ["$route", "$rootScope", "$scope", "$filter", "$window", "$timeout", "$location",
		function($route, $rootScope, $scope, $filter, $window, $timeout, $location)
		{
			$scope.datas;
			$scope.searchKeywords;
			$scope.filteredData;
			$scope.numPerPageOpts;
			$scope.numPerPage;
			$scope.currentPage;
			$scope.currentPageStores;

			
			/*
			function getAssignments()
			{
				assignmentService.getAssignments()
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
			}
			*/

			$scope.showNew = false;
		    $scope.toggleNew = function()
		    {
		        $scope.showNew = !$scope.showNew;
		    };

			$scope.showEdit = false;
		    $scope.toggleEdit = function(id)
		    {
		        $scope.showEdit = !$scope.showEdit;
		        $rootScope.$emit('handleEditTeam', { id: id} );
		    };

		    function reload()
		    {
		    	$route.reload();
		    }

		    $rootScope.$on('closeNewTeamModal', function(event, params)
		    {
		    	$scope.showNew = !$scope.showNew
		    	$timeout(reload, 800);
		    });

		    $rootScope.$on('closeEditTeamModal', function(event, params)
		    {
		    	$scope.showEdit = !$scope.showEdit
		    	$timeout(reload, 800);
		    });
		}
	])

	.controller("NewTeam", ["$rootScope", "$scope", "$window", "employeeService", "customerService", "projectService",
		function($rootScope, $scope, $window, employeeService, customerService, projectService)
		{
			$scope.customers;
			$scope.requirements;

			$scope.init = function()
			{
				customerService.getCustomers()
				.then(function(response)
				{
					$scope.customers = response.data;
				});
			}

			$scope.selectCustomer = function(id)
			{
				projectService.getProjectsByCustomer(id)
				.then(function(response)
				{
					$scope.requirements = response.data;
				});
			}

			$scope.save = function(isValid)
			{
				if(isValid)
				{

				}
			}
		}
	])

	.controller("EditTeam", ["$rootScope", "$scope", "$routeParams", "$window", "employeeService",
		function($rootScope, $scope, $routeParams, $window, employeeService)
		{
			$scope.customers;

			// Obtiene la asignacion o equipo de requerimiento
			function getAssignment(id)
			{

			}

			// Obtiene los requerimientos para la lista de seleccion
			function getProjects()
			{

			}

			$scope.save = function(isValid)
			{
				if(isValid)
				{

				}
			}

			$rootScope.$on('handleEditProject', function(event, params)
			{
				var id = params.id;
			});
		}
	])

}())