;(function() {
"use strict";

angular.module("app.ui.admin.skill.types", [])

// Listado de tipos de competencia
.controller("ListSkillTypes", ["$route", "$rootScope", "$scope", "$filter", "$window", "$timeout", "$location", "skillTypeService", 
	function($route, $rootScope, $scope, $filter, $window, $timeout, $location, skillTypeService) 
	{
		$scope.datas;
		$scope.searchKeywords;
		$scope.filteredData;
		$scope.numPerPageOpts;
		$scope.numPerPage;
		$scope.currentPage;
		$scope.currentPageStores;
	
		getSkillTypes();
	
		function getSkillTypes() 
		{
			skillTypeService.getSkillTypes()
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
			})
		}

		$scope.delete = function(id)
		{
			bootbox.confirm("¿Está seguro que desea eliminar el tipo de competencia seleccionada?", function(result)
			{
				if(result)
				{
					skillTypeService.deleteSkillType(id)
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
	        $rootScope.$emit('handleEditSkillType', { id: id} );
	    };

	    function reload()
	    {
	    	$route.reload();
	    }

	    $rootScope.$on('closeNewSkillTypeModal', function(event, params)
	    {
	    	$scope.showNew = !$scope.showNew
	    	$timeout(reload, 800);
	    });

	    $rootScope.$on('closeEditSkillTypeModal', function(event, params)
	    {
	    	$scope.showEdit = !$scope.showEdit
	    	$timeout(reload, 800);
	    });
	}
])

// Registro de tipo de competencia
.controller("NewSkillType", ["$rootScope", "$scope", "$window", "skillTypeService", 
	function($rootScope, $scope, $window, skillTypeService)
	{
		$scope.save = function(isValid)
		{
			if(isValid)
			{
				var data = $scope.skillType;
				skillTypeService.createSkillType(data)
				.then(function(response)
				{
					toastr.success('Registro satisfactorio');
					$rootScope.$emit('closeNewSkillTypeModal', {});
				});
			}
		}
	}
])

// Edicion de tipo de competencia
.controller("EditSkillType", ["$rootScope", "$scope", "$routeParams", "$window", "skillTypeService", 
	function($rootScope, $scope, $routeParams, $window, skillTypeService)
	{	
		function getSkillType(id)
		{
			skillTypeService.getSkillType(id)
			.then(function(response)
			{
				$scope.skillType = response.data;
			});
		}

		$scope.save = function(isValid)
		{
			if(isValid)
			{
				var data = $scope.skillType;
				skillTypeService.updateSkillType(data)
				.then(function(response)
				{
					toastr.success('Edición satisfactoria');
					$rootScope.$emit('closeEditSkillTypeModal', {});
				});
			}
		}

		$rootScope.$on('handleEditSkillType', function(event, params)
		{
			var id = params.id;
			getSkillType(id);
		});
	}
])

.factory('skillTypeService', ['$http', function($http)
{
	var baseUrl = 'http://localhost:8082/api/skillType';
	var dataFactory = {};

	dataFactory.getSkillTypes = function()
	{
		return $http.get(baseUrl);
	}

	dataFactory.getSkillType = function(id)
	{
		return $http.get(baseUrl + '/' + id);
	}

	dataFactory.createSkillType = function(skillType)
	{
		return $http.post(baseUrl, skillType);
	}

	dataFactory.updateSkillType = function(skillType)
	{
		return $http.put(baseUrl + '/' + skillType._id, skillType);
	}

	dataFactory.deleteSkillType = function(id)
	{
		return $http.delete(baseUrl + '/' + id);
	}

	return dataFactory;
}])

}())