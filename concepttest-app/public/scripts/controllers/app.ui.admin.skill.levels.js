;(function() {
"use strict";

angular.module("app.ui.admin.skill.levels", [])

// List Controller 
.controller("ListSkillLevels", ["$route", "$scope", "$filter", "$window", "$location", "skillLevelService", 
	function($route, $scope, $filter, $window, $location, skillLevelService) {

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
			$window.location.href = '/#/admin/editSkillLevel?id=' + id;
		}

		$scope.delete = function(id)
		{
			if(confirm("¿Está seguro que desea eliminar el nivel de competencia seleccionada?"))
			{
				skillLevelService.deleteSkillLevel(id)
				.then(function(response)
				{
					$route.reload();
				});
			}
		}
	}
}])

// Registro de nivel competencia
.controller("NewSkillLevel", ["$scope", "$window", "skillLevelService", "skillService", 
	function($scope, $window, skillLevelService, skillService) {

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
				alert("Registro satisfactorio");
				$window.location.href = '/#/admin/skillLevels';
			});
		}
	}

	$scope.cancel = function()
	{
		$window.location.href = '/#/admin/skillLevels';
	}
}])

// Edicion de nivel de competencia
.controller("EditSkillLevel", ["$scope", "$routeParams", "$window", "skillLevelService", "skillService", 
	function($scope, $routeParams, $window, skillLevelService, skillService) {

	$scope.skills;

	var id = $routeParams.id;

	getSkills();
	getSkillLevel(id);

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
				alert("Actualizacion satisfactoria");
				$window.location.href = '/#/admin/skillLevels';
			});
		}
	}

	$scope.cancel = function()
	{
		$window.location.href = '/#/admin/skillLevels';
	}
}])

}())