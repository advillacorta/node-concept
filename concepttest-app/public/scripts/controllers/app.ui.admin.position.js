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
		
		$scope.edit = function(id)
		{
			$window.location.href = '/#/admin/editPosition?id=' + id;
		}

		$scope.delete = function(id)
		{
			if(confirm("¿Está seguro que desea eliminar el cargo seleccionado?"))
			{
				positionService.deletePosition(id)
				.then(function(response)
				{
					$route.reload();
				});
			}
		}
	}
])

// Registro de cargo
.controller('NewPosition', ["$scope", "$window", "positionService", "skillService", "skillLevelService", 
	function($scope, $window, positionService, skillService, skillTypeService)
	{
		$scope.init = function()
		{
			
		}
		
		$scope.save = function(isValid)
		{
			if(isValid)
			{
				var data = $scope.skill;
				positionService.createPosition(data)
				.then(function(response)
				{
					alert("Registro satisfactorio");
					$window.location.href = '/#/admin/positions';
				});
			}
		}
		
		$scope.cancel = function()
		{
			$window.location.href = '/#/admin/positions';
		}
	}
])

// Edicion de cargo
.controller('NewPosition', ["$scope", "$window", "positionService", "skillService", "skillLevelService", 
	function($scope, $window, positionService, skillService, skillTypeService)
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