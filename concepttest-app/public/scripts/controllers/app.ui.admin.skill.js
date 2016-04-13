;(function() {
"use strict";

angular.module("app.ui.admin.skill", [])

// List Controller 
.controller("ListSkills", ["$route", "$scope", "$filter", "$window", "$location", "skillService", 
	function($route, $scope, $filter, $window, $location, skillService) 
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
	
		$scope.edit = function(id)
		{
			$window.location.href = '/#/admin/editSkill?id=' + id;
		}
	
		$scope.delete = function(id)
		{
			if(confirm("¿Está seguro que desea eliminar la competencia seleccionada?"))
			{
				skillService.deleteSkill(id)
				.then(function(response)
				{
					$route.reload();
				});
			}
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
    	};
	}
])

// Registro de competencia
.controller("NewSkill", ["$scope", "$window", "skillService", "skillTypeService", 
	function($scope, $window, skillService, skillTypeService)
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
					alert("Registro satisfactorio");
					$window.location.href = '/#/admin/manageSkills';
				});
			}
		}
	
		$scope.cancel = function()
		{
			$window.location.href = '/#/admin/skills';
		}
	}
])

// Edicion de competencia
.controller("EditSkill", ["$scope", "$routeParams", "$window", "skillService", "skillTypeService", 
	function($scope, $routeParams, $window, skillService, skillTypeService)
	{	
		$scope.skillTypes;
	
		var id = $routeParams.id;
	
		getSkillTypes();
		getSkill(id);
	
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
					alert("Actualizacion satisfactoria");
					$window.location.href = '/#/admin/skills';
				});
			}
		}
	
		$scope.cancel = function()
		{
			$window.location.href = '/#/admin/skills';
		}
	}
])

}())