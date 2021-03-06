;(function() {
"use strict";

angular.module("app.ui.admin.skill", [])

// List Controller 
.controller("ListSkills", ["$route", "$rootScope", "$scope", "$filter", "$window", "$timeout", "$location", "skillService", 
	function($route, $rootScope, $scope, $filter, $window, $timeout, $location, skillService) 
	{
		$scope.datas;
		$scope.searchKeywords;
		$scope.filteredData;
		$scope.numPerPageOpts;
		$scope.numPerPage;
		$scope.currentPage;
		$scope.currentPageStores;

		getSkills();

		function getSkills()
		{
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
		}

		$scope.delete = function(id)
		{
			bootbox.confirm("¿Está seguro que desea eliminar la competencia seleccionada?", function(result)
			{
				if(result)
				{
					skillService.deleteSkill(id)
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
	        $rootScope.$emit('handleEditSkill', { id: id} );
	    };

	    function reload()
	    {
	    	$route.reload();
	    }

	    $rootScope.$on('closeNewSkillModal', function(event, params)
	    {
	    	$scope.showNew = !$scope.showNew
	    	$timeout(reload, 800);
	    });

	    $rootScope.$on('closeEditSkillModal', function(event, params)
	    {
	    	$scope.showEdit = !$scope.showEdit
	    	$timeout(reload, 800);
	    });
	}
])

// Registro de competencia
.controller("NewSkill", ["$rootScope", "$scope", "$window", "skillService", "skillTypeService", 
	function($rootScope, $scope, $window, skillService, skillTypeService)
	{
		$scope.skillTypes;

		$scope.init = function()
		{
			skillTypeService.getSkillTypes()
			.then(function(response)
			{
				$scope.skillTypes = response.data;
			});
		}

		$scope.save = function(isValid)
		{
			if(isValid)
			{
				var data = $scope.skill;
				skillService.createSkill(data)
				.then(function(response)
				{
					toastr.success('Registro satisfactorio');
					$rootScope.$emit('closeNewSkillModal', {});
				});
			}
		}
	}
])

// Edicion de competencia
.controller("EditSkill", ["$rootScope", "$scope", "$routeParams", "$window", "skillService", "skillTypeService", 
	function($rootScope, $scope, $routeParams, $window, skillService, skillTypeService)
	{	
		$scope.skillTypes;

		function getSkill(id)
		{
			skillService.getSkill(id)
			.then(function(response)
			{
				console.log(response);
				$scope.skill = response.data;
			});
		}

		function getSkillTypes()
		{
			skillTypeService.getSkillTypes()
			.then(function(response)
			{
				$scope.skillTypes = response.data;
			});
		}

		$scope.save = function(isValid)
		{
			if(isValid)
			{
				var data = $scope.skill;
				skillService.updateSkill(data)
				.then(function(response)
				{
					toastr.success('Edición satisfactoria');
					$rootScope.$emit('closeEditSkillModal', {});
				});
			}
		}

		$rootScope.$on('handleEditSkill', function(event, params)
		{
			var id = params.id;

			getSkillTypes();
			getSkill(id);
		});
	}
])

.factory('skillService', ['$http', function($http)
{
	var baseUrl = 'http://localhost:8082/api/skill';
	var dataFactory = {};

	dataFactory.getSkills = function()
	{
		return $http.get(baseUrl);
	}

	dataFactory.getSkill = function(id)
	{
		return $http.get(baseUrl + '/' + id);
	}

	dataFactory.getSkillsByType = function(skillTypeId)
	{
		return $http.get(baseUrl + '/skillType/' + skillTypeId);
	}

	dataFactory.createSkill = function(skill)
	{
		return $http.post(baseUrl, skill);
	}

	dataFactory.updateSkill = function(skill)
	{
		return $http.put(baseUrl + '/' + skill._id, skill);
	}

	dataFactory.deleteSkill = function(id)
	{
		return $http.delete(baseUrl + '/' + id);
	}

	return dataFactory;
}])

}())