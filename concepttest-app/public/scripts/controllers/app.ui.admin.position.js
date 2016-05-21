;(function() {
"use strict";

angular.module("app.ui.admin.position", [])

// Listado de posiciones
.controller("ListPositions", ["$route", "$rootScope", "$scope", "$filter", "$window", "$timeout", "$location", "positionService", 
	function($route, $rootScope, $scope, $filter, $window, $timeout, $location, positionService) 
	{
		$scope.datas;
		$scope.searchKeywords;
		$scope.filteredData;
		$scope.numPerPageOpts;
		$scope.numPerPage;
		$scope.currentPage;
		$scope.currentPageStores;
		
		getPositions();

		function getPositions()
		{
			positionService.getPositions()
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
			bootbox.confirm("¿Está seguro que desea eliminar el cargo seleccionado?", function(result)
			{
				if(result)
				{
					positionService.deletePosition(id)
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
	        $rootScope.$emit('handleEditPosition', { id: id} );
	    };

	    function reload()
	    {
	    	$route.reload();
	    }

	    $rootScope.$on('closeNewPositionModal', function(event, params)
	    {
	    	$scope.showNew = !$scope.showNew
	    	$timeout(reload, 800);
	    });

	    $rootScope.$on('closeEditPositionModal', function(event, params)
	    {
	    	$scope.showEdit = !$scope.showEdit
	    	$timeout(reload, 800);
	    });
	}
])

// Registro de cargo
.controller('NewPosition', ["$rootScope", "$scope", "$filter", "$window", "positionService", "skillService", "skillLevelService", 
	function($rootScope, $scope, $filter, $window, positionService, skillService, skillLevelService)
	{
		// Available skills
		$scope.availableSkills;
		$scope.availableFilteredData;
		$scope.availableSearchKeywords = "";
		$scope.availableRow = "";
		$scope.availableNumPerPageOpts;
		$scope.availableNumPerPage;
		$scope.availableCurrentPage;
		$scope.availableCurrentPageStores;

		// Selected skills
		$scope.selectedSkills = [];

		$scope.position = new Object();
		$scope.position.skills = [];

		console.log($scope.selectedSkills.length);

		$scope.init = function()
		{

			skillService.getSkills()
			.then(function(response)
			{
				$scope.availableSkills = response.data;

				$scope.availableFilteredData = [];
				$scope.availableSearchKeywords = "";
				$scope.availableRow = "";

				$scope.availableNumPerPageOpts = [5, 7, 10, 25, 50, 100];
				$scope.availableNumPerPage = $scope.availableNumPerPageOpts[1];
				$scope.availableCurrentPage = 1;
				$scope.availableCurrentPageStores = [];

				$scope.select = function(page) 
				{
					var start = (page - 1)*$scope.availableNumPerPage,
						end = start + $scope.availableNumPerPage;
	
					$scope.availableCurrentPageStores = $scope.availableFilteredData.slice(start, end);
				}

				$scope.onFilterChange = function() 
				{
					$scope.select(1);
					$scope.availableCurrentPage = 1;
					$scope.availableRow = '';
				}

				$scope.onNumPerPageChange = function() 
				{
					$scope.select(1);
					$scope.availableCurrentPage = 1;
				}

				$scope.onOrderChange = function() 
				{
					$scope.select(1);
					$scope.availableCurrentPage = 1;
				}

				$scope.search = function() 
				{
					$scope.availableFilteredData = $filter("filter")($scope.availableSkills, $scope.availableSearchKeywords);
					$scope.onFilterChange();
				}

				$scope.order = function(rowName) 
				{
					if($scope.availableRow == rowName)
						return;
					$scope.availableRow = rowName;
					$scope.availableFilteredData = $filter('orderBy')($scope.availableSkills, rowName);
					$scope.onOrderChange();
				}

				$scope.search();
				$scope.select($scope.availableCurrentPage);
			});
		}
		
		$scope.add = function(index, skillId)
		{
			var skill = $scope.availableSkills[index];
			$scope.availableSkills.splice(index, 1);

			skillLevelService.getSkillLevelsBySkill(skillId)
			.then(function(response)
			{
				skill.levels = response.data;

				// Se actualiza para la vista
				$scope.selectedSkills.push(skill);

				// Se actualiza para el model
				var nSkill = new Object();
				nSkill.skillId = skill._id;
				nSkill.skillLevelId = skill.skillLevelId;
				$scope.position.skills.push(nSkill);
			});

			$scope.search();
		}

		$scope.remove = function(index)
		{
			$scope.availableSkills.push($scope.selectedSkills[index]);
			$scope.selectedSkills.splice(index, 1);
			$scope.position.skills.splice(index, 1);
			$scope.search();
		}

		$scope.save = function(isValid)
		{
			if(isValid)
			{
				var data = $scope.position;

				positionService.createPosition(data)
				.then(function(response)
				{
					toastr.success('Registro satisfactorio');
					$rootScope.$emit('closeNewPositionModal', {});
				});
			}
		}
	}
])

// Edicion de cargo
.controller('EditPosition', ["$rootScope", "$scope", "$filter", "$window", "positionService", "skillService", "skillLevelService", 
	function($rootScope, $scope, $filter, $window, positionService, skillService, skillLevelService)
	{
		// Available skills
		$scope.availableSkills;
		$scope.availableFilteredData;
		$scope.availableSearchKeywords = "";
		$scope.availableRow = "";
		$scope.availableNumPerPageOpts;
		$scope.availableNumPerPage;
		$scope.availableCurrentPage;
		$scope.availableCurrentPageStores;

		// Selected skills
		$scope.selectedSkills = [];

		function getAvailableSkills()
		{
			skillService.getSkills()
			.then(function(response)
			{
				$scope.availableSkills = response.data;

				$scope.availableFilteredData = [];
				$scope.availableSearchKeywords = "";
				$scope.availableRow = "";

				$scope.availableNumPerPageOpts = [5, 7, 10, 25, 50, 100];
				$scope.availableNumPerPage = $scope.availableNumPerPageOpts[1];
				$scope.availableCurrentPage = 1;
				$scope.availableCurrentPageStores = [];

				$scope.select = function(page) 
				{
					var start = (page - 1)*$scope.availableNumPerPage,
						end = start + $scope.availableNumPerPage;
	
					$scope.availableCurrentPageStores = $scope.availableFilteredData.slice(start, end);
				}

				$scope.onFilterChange = function() 
				{
					$scope.select(1);
					$scope.availableCurrentPage = 1;
					$scope.availableRow = '';
				}

				$scope.onNumPerPageChange = function() 
				{
					$scope.select(1);
					$scope.availableCurrentPage = 1;
				}

				$scope.onOrderChange = function() 
				{
					$scope.select(1);
					$scope.availableCurrentPage = 1;
				}

				$scope.search = function() 
				{
					$scope.availableFilteredData = $filter("filter")($scope.availableSkills, $scope.availableSearchKeywords);
					$scope.onFilterChange();
				}

				$scope.order = function(rowName) 
				{
					if($scope.availableRow == rowName)
						return;
					$scope.availableRow = rowName;
					$scope.availableFilteredData = $filter('orderBy')($scope.availableSkills, rowName);
					$scope.onOrderChange();
				}

				$scope.search();
				$scope.select($scope.availableCurrentPage);
			});
		}

		function getPosition(id)
		{
			positionService.getPosition(id)
			.then(function(response)
			{
				$scope.position = response.data;
				var positionSkills = $scope.position.skills;

				//TODO: procesar lista de competencias seleccionadas y disponibles.
				var pos = [];

				for(var j in $scope.availableSkills)
				{
					var availableSkill = $scope.availableSkills[j];
					for(var i in positionSkills)
					{
						var positionSkill = positionSkills[i];
						if(availableSkill._id == positionSkill.skillId)
						{
							skillLevelService.getSkillLevelsBySkill(positionSkill.skillId)
							.then(function(response)
							{
								availableSkill.levels = response.data;
								$scope.selectedSkills.push(availableSkill);	
							});

							$scope.availableSkills.splice(j, 1);
						}
					}
				}

				$scope.search();
			});
		}
		
		$scope.save = function(isValid)
		{
			if(isValid)
			{
				var data = $scope.position;
				console.log(data);

				positionService.updatePosition(data)
				.then(function(response)
				{
					toastr.success('Edición satisfactorio');
					$rootScope.$emit('closeEditPositionModal', {});
				});
			}
		}

		$scope.add = function(index, skillId)
		{
			var skill = $scope.availableSkills[index];
			$scope.availableSkills.splice(index, 1);

			skillLevelService.getSkillLevelsBySkill(skillId)
			.then(function(response)
			{
				skill.levels = response.data;

				// Se actualiza para la vista
				$scope.selectedSkills.push(skill);

				// Se actualiza para el model
				var nSkill = new Object();
				nSkill.skillId = skill._id;
				nSkill.skillLevelId = skill.skillLevelId;
				$scope.position.skills.push(nSkill);
			});

			$scope.search();
		}

		$scope.remove = function(index)
		{
			$scope.availableSkills.push($scope.selectedSkills[index]);
			$scope.selectedSkills.splice(index, 1);
			$scope.position.skills.splice(index, 1);
			$scope.search();
		}

		$rootScope.$on('handleEditPosition', function(event, params)
		{
			$scope.position = new Object();
			$scope.selectedSkills = [];
			var id = params.id;

			getAvailableSkills();
			getPosition(id);
		});
	}
])

.factory('positionService', ['$http', function($http)
{
	var baseUrl = 'http://localhost:8082/api/position';
	var dataFactory = {};

	dataFactory.getPositions = function()
	{
		return $http.get(baseUrl);
	}

	dataFactory.getPosition = function(id)
	{
		return $http.get(baseUrl + '/' + id);
	}

	dataFactory.createPosition = function(position)
	{
		return $http.post(baseUrl, position);
	}

	dataFactory.updatePosition = function(position)
	{
		return $http.put(baseUrl + '/' + position._id, position);
	}

	dataFactory.deletePosition = function(id)
	{
		return $http.delete(baseUrl + '/' + id);
	}

	return dataFactory;
}])

}())