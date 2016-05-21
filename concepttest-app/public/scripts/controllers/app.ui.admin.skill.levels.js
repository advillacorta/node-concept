;(function() {
"use strict";

angular.module("app.ui.admin.skill.levels", [])

// List Controller 
.controller("ListSkillLevels", ["$route", "$rootScope", "$scope", "$filter", "$window", "$timeout", "$location", "skillLevelService", 
	function($route, $rootScope, $scope, $filter, $window, $timeout, $location, skillLevelService) 
	{
		$scope.datas;
		$scope.searchKeywords;
		$scope.filteredData;
		$scope.numPerPageOpts;
		$scope.numPerPage;
		$scope.currentPage;
		$scope.currentPageStores;

		getSkillLevels();

		function getSkillLevels()
		{
			skillLevelService.getSkillLevels()
			.then(function(response)
			{
				$scope.datas = response.data;

				$scope.searchKeywords = "";
				$scope.filteredData = [];	
				$scope.row = "";

				$scope.numPerPageOpts = [5, 7, 10, 25, 50, 100];
				$scope.numPerPage = $scope.numPerPageOpts[1];
				$scope.currentPage = 1;
				$scope.currentPageStores = [];


				$scope.select = function(page) 
				{
					var start = (page - 1)*$scope.numPerPage,
						end = start + $scope.numPerPage;

					$scope.currentPageStores = $scope.filteredData.slice(start, end);
				}

				$scope.onFilterChange = function() 
				{
					$scope.select(1);
					$scope.currentPage = 1;
					$scope.row = '';
				}

				$scope.onNumPerPageChange = function() 
				{
					$scope.select(1);
					$scope.currentPage = 1;
				}

				$scope.onOrderChange = function() 
				{
					$scope.select(1);
					$scope.currentPage = 1;
				}

				$scope.search = function() 
				{
					$scope.filteredData = $filter("filter")($scope.datas, $scope.searchKeywords);
					$scope.onFilterChange();
				}

				$scope.order = function(rowName) 
				{
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
			bootbox.confirm("¿Está seguro que desea eliminar el nivel de competencia seleccionada?", function(result)
			{
				if(result)
				{
					skillLevelService.deleteSkillLevel(id)
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
	    }

		$scope.showEdit = false;
	    $scope.toggleEdit = function(id)
	    {
	        $scope.showEdit = !$scope.showEdit;
	        $rootScope.$emit('handleEditSkillLevel', { id: id} );
	    }

	    function reload()
	    {
	    	$route.reload();
	    }

	    $rootScope.$on('closeNewSkillLevelModal', function(event, params)
	    {
	    	$scope.showNew = !$scope.showNew
	    	$timeout(reload, 800);
	    });

	    $rootScope.$on('closeEditSkillLevelModal', function(event, params)
	    {
	    	$scope.showEdit = !$scope.showEdit
	    	$timeout(reload, 800);
	    });
	}
])

// Registro de nivel competencia
.controller("NewSkillLevel", ["$rootScope", "$scope", "$window", "skillLevelService", "skillService", 
	function($rootScope, $scope, $window, skillLevelService, skillService) 
	{
		$scope.skills;

		$scope.init = function()
		{
			skillService.getSkills()
			.then(function(response)
			{
				$scope.skills = response.data;
			});
		}

		$scope.save = function(isValid)
		{
			if(isValid)
			{
				var data = $scope.skillLevel;
				skillLevelService.createSkillLevel(data)
				.then(function(response)
				{
					toastr.success('Registro satisfactorio');
					$rootScope.$emit('closeNewSkillLevelModal', {});
				});
			}
		}
	}
])

// Edicion de nivel de competencia
.controller("EditSkillLevel", ["$rootScope", "$scope", "$routeParams", "$window", "skillLevelService", "skillService", 
	function($rootScope, $scope, $routeParams, $window, skillLevelService, skillService) 
	{
		$scope.skills;

		function getSkillLevel(id)
		{
			skillLevelService.getSkillLevel(id)
			.then(function(response)
			{
				console.log(response);
				$scope.skillLevel = response.data;
			});
		}

		function getSkills()
		{
			skillService.getSkills()
			.then(function(response)
			{
				$scope.skills = response.data;
			});
		}

		$scope.save = function(isValid)
		{
			if(isValid)
			{
				var data = $scope.skillLevel;
				skillLevelService.updateSkillLevel(data)
				.then(function(response)
				{
					toastr.success('Edición satisfactoria');
					$rootScope.$emit('closeEditSkillLevelModal', {});
				});
			}
		}

		$rootScope.$on('handleEditSkillLevel', function(event, params)
		{
			var id = params.id;

			getSkills();
			getSkillLevel(id);
		});
	}
])

.factory('skillLevelService', ['$http', function($http)
{
	var baseUrl = 'http://localhost:8082/api/skillLevel';
	var dataFactory = {};

	dataFactory.getSkillLevels = function()
	{
		return $http.get(baseUrl);
	}

	dataFactory.getSkillLevel = function(id)
	{
		return $http.get(baseUrl + '/' + id);
	}

	dataFactory.createSkillLevel = function(skill)
	{
		return $http.post(baseUrl, skill);
	}

	dataFactory.updateSkillLevel = function(skill)
	{
		return $http.put(baseUrl + '/' + skill._id, skill);
	}

	dataFactory.deleteSkillLevel = function(id)
	{
		return $http.delete(baseUrl + '/' + id);
	}

	dataFactory.getSkillLevelsBySkill = function(skillId)
	{
		return $http.get(baseUrl + '/skill/' + skillId);
	}

	return dataFactory;
}])

}())