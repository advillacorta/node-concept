;(function() {
"use strict";

angular.module("app.ui.admin.position", [])

// List Controller 
.controller("ListPositions", ["$scope", "$filter", function($scope, $filter) {
	// data
	$scope.datas = [
		{name: "Analista funcional", description: "Encargado del levantamiento y analisis de la informacion."},
		{name: "Analista tecnico", description: "Encargado de traducir los requerimientos funcionales a componentes tecnicos."},
		{name: "Analista programador", description: "Encargado del desarrollo de aplicaciones."},
	];
	var prelength = $scope.datas.length;

	// create random data (uses `track by $index` in html for duplicacy)
	/*
	for(var i = prelength; i < 100; i++) {
		var rand = Math.floor(Math.random()*prelength);
		$scope.datas.push($scope.datas[rand]);
	}
	*/
	
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
}])

}())