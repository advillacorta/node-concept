;(function() {
"use strict";

angular.module("app.ui.admin.position", [])

// Listado de posiciones
.controller("ListPositions", ["$route", "$scope", "$filter", "$window", "$location", "positionService", 
	function($route, $scope, $filter, $window, $location, positionService) 
	{
		$scope.datas;
		$scope.searchKeywords;
		$scope.filteredData;
		$scope.numPerPageOpts;
		$scope.numPerPage;
		$scope.currentPage;
		$scope.currentPageStores;
		
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

		$scope.showNew = false;
	    $scope.toggleNew = function()
	    {
	        $scope.showNew = !$scope.showNew;
	    };
	}
])

// Registro de cargo
.controller('NewPosition', ["$scope", "$filter", "$window", "positionService", "skillService", "skillLevelService", 
	function($scope, $filter, $window, positionService, skillService, skillLevelService)
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
				$scope.selectedSkills.push(skill);	
			});

			$scope.search();
		}

		$scope.remove = function(index)
		{
			$scope.availableSkills.push($scope.selectedSkills[index]);
			$scope.selectedSkills.splice(index, 1);
			$scope.search();
		}

		$scope.save = function(isValid)
		{
			if(isValid)
			{
				var data = $scope.position;
				console.log(angular.toJson($scope.position));
				/*
				positionService.createPosition(data)
				.then(function(response)
				{
					alert("Registro satisfactorio");
					$window.location.href = '/#/admin/positions';
				});
				*/
			}
		}
	}
])

// Edicion de cargo
.controller('EditPosition', ["$scope", "$window", "positionService", "skillService", "skillLevelService", 
	function($scope, $window, positionService, skillService, skillLevelService)
	{
		$scope.init = function()
		{
			
		}
		
		$scope.save = function(isValid)
		{
			
		}
		
		$scope.cancel = function()
		{
			$window.location.href = '/#/admin/positions';
		}
	}
])	

}())