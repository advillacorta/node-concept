;(function() {
"use strict";

angular.module("app.ui.admin.projects", [])

	.controller("ListProjects", ["$route", "$rootScope", "$scope", "$filter", "$window", "$timeout", "$location", "projectService",
		function($route, $rootScope, $scope, $filter, $window, $timeout, $location, projectService)
		{
			$scope.datas;
			$scope.searchKeywords;
			$scope.filteredData;
			$scope.numPerPageOpts;
			$scope.numPerPage;
			$scope.currentPage;
			$scope.currentPageStores;

			getProjects();

			function getProjects()
			{
				projectService.getProjects()
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

			$scope.delete = function(id)
			{
				bootbox.confirm("¿Está seguro que desea eliminar el requerimiento seleccionado?", function(result)
				{
					if(result)
					{
						projectService.deleteProject(id)
						.then(function(response)
						{
							toastr.success('Registro eliminado.');
							reload();
						});
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

	.controller("NewProject", ["$rootScope", "$scope", "$window", "customerService", "projectService",
		function($rootScope, $scope, $window, customerService, projectService)
		{
			$scope.customers;

			$scope.init = function()
			{
				customerService.getCustomers()
				.then(function(response)
				{
					$scope.customers = response.data;
				});
			}

			$scope.save = function(isValid)
			{
				if(isValid)
				{
					var data = $scope.project;
					projectService.createProject(data)
					.then(function(response)
					{
						toastr.success("Registro satisfactorio");
						$rootScope.$emit("closeNewProjectModal", {});
					});
				}
			}
		}
	])

	.controller("EditProject", ["$rootScope", "$scope", "$routeParams", "$window", "customerService", "projectService",
		function($rootScope, $scope, $routeParams, $window, customerService, projectService)
		{
			$scope.customers;

			function getProject(id)
			{
				projectService.getProject(id)
				.then(function(response)
				{
					$scope.project = response.data;
				});
			}

			function getCustomers()
			{
				customerService.getCustomers()
				.then(function(response)
				{
					$scope.customers = response.data;
				});
			}

			$scope.save = function(isValid)
			{
				if(isValid)
				{
					var data = $scope.project;
					projectService.updateProject(data)
					.then(function(response)
					{
						toastr.success('Edición satisfactoria');
						$rootScope.$emit('closeEditProjectModal', {});
					});
				}
			}

			$rootScope.$on('handleEditProject', function(event, params)
			{
				var id = params.id;

				getCustomers();
				getProject(id);
			});
		}
	])

	.factory('projectService', ['$http', function($http)
	{
		var baseUrl = 'http://localhost:8082/api/project';
		var dataFactory = [];

		dataFactory.getProjects = function()
		{
			return $http.get(baseUrl);
		}

		dataFactory.getProject = function(projectId)
		{
			return $http.get(baseUrl + '/' + projectId);
		}

		dataFactory.getProjectsByCustomer = function(customerId)
		{
			return $http.get(baseUrl + '/customer/' + customerId);
		}

		dataFactory.createProject = function(project)
		{
			return $http.post(baseUrl, project);
		}

		dataFactory.updateProject = function(project)
		{
			return $http.put(baseUrl + '/' + project._id, project);
		}

		dataFactory.deleteProject = function(projectId)
		{
			return $http.delete(baseUrl + '/' + projectId);
		}

		return dataFactory;
	}])
}())