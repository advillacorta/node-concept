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

	    function reload()
	    {
	    	$route.reload();
	    }

		$scope.showNew = false;
	    $scope.toggleNew = function()
	    {
	        $scope.showNew = !$scope.showNew;
	    };

	    $rootScope.$on('closeNewModal', function(event, params)
	    {
	    	$scope.showNew = !$scope.showNew;
	    	$timeout(reload, 800);
	    });

		$scope.showEdit = false;
	    $scope.toggleEdit = function(id)
	    {
	        $scope.showEdit = !$scope.showEdit;
	        $rootScope.$emit('handleEdit', { id: id} );
	    };

	    $rootScope.$on('closeEditModal', function(event, params)
	    {
	    	$scope.showEdit = !$scope.showEdit;
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
					$rootScope.$emit('closeNewModal', {});
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
					toastr.success('Actualizacion satisfactoria');
					$rootScope.$emit('closeEditModal', {});
				});
			}
		}

		$rootScope.$on('handleEdit', function(event, params)
		{
			var id = params.id;

			getSkillTypes();
			getSkill(id);
		});
	}
])

}())