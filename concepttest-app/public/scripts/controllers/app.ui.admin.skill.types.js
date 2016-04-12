;(function() {
"use strict";

angular.module("app.ui.admin.skill.types", [])

// Listado de tipos de competencia
.controller("ListSkillTypes", ["$route", "$scope", "$filter", "$window", "$location", "skillTypeService", 
	function($route, $scope, $filter, $window, $location, skillTypeService) {
	
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

		$scope.edit = function(id)
		{
			$window.location.href = '/#/admin/editSkillType?id=' + id;
		}

		$scope.delete = function(id)
		{
			if(confirm("¿Está seguro que desea eliminar el tipo de competencia seleccionado?"))
			{
				skillTypeService.deleteSkillType(id)
				.then(function(response)
				{
					$route.reload();
				});
			}
		}
	}
}])

// Registro de tipo de competencia
.controller("NewSkillType", ["$scope", "$window", "skillTypeService", function($scope, $window, skillTypeService)
{
	$scope.save = function(isValid)
	{
		if(isValid)
		{
			var data = $scope.skillType;
			skillTypeService.createSkillType(data)
			.then(function(response)
			{
				alert("Registro satisfactorio");
				$window.location.href = '/#/admin/skillTypes';
			});
		}
	}

	$scope.cancel = function()
	{
		$window.location.href = '/#/admin/skillTypes';
	}
}])

// Edicion de tipo de competencia
.controller("EditSkillType", ["$scope", "$routeParams", "$window", "skillTypeService", function($scope, $routeParams, $window, skillTypeService)
{	
	var id = $routeParams.id;

	getSkillType(id);

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
				alert("Actualizacion satisfactoria");
				$window.location.href = '/#/admin/skillTypes';
			});
		}
	}

	$scope.cancel = function()
	{
		$window.location.href = '/#/admin/skillTypes';
	}
}])

}())