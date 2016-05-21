;(function() {
	"use strict";

	angular.module("app", [
		/* Angular modules */
		"ngRoute",
		"ngAnimate",
		"ngSanitize",

		/* 3rd Party Modules */
		"ui.bootstrap",
		"ui.select",
		"textAngular",
		"angular-skycons",
		"angular-loading-bar",

		/* Custom Modules */
		"app.ui.ctrls",
		"app.ui.form.ctrls",
		"app.directives",
		"app.ctrls",
		
		/* App Modules */
		"app.ui.admin.skill",
		"app.ui.admin.skill.types",
		"app.ui.admin.skill.levels",
		"app.ui.admin.position",
		"app.ui.admin.projects",
		"app.ui.admin.questions",
		"app.ui.admin.tests"
	])

	.directive('modal', function () {
	    return {
	      template: '<div class="modal fade">' + 
	          '<div class="modal-dialog {{ size }}">' + 
	            '<div class="modal-content">' + 
	              '<div class="modal-header">' + 
	                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
	                '<h4 class="modal-title">{{ title }}</h4>' + 
	              '</div>' + 
	              '<div class="modal-body" ng-transclude></div>' + 
	            '</div>' + 
	          '</div>' + 
	        '</div>',
	      restrict: 'E',
	      transclude: true,
	      replace:true,
	      scope:true,
	      link: function postLink(scope, element, attrs) {
	        scope.title = attrs.title;
	        scope.size = attrs.size;

	        scope.$watch(attrs.visible, function(value)
	        {
	          if(value == true)
	          {
	            $(element).modal('show');
	          }
	          else
	          {
	          	$(element).modal('hide');
	          }
	        });

	        $(element).on('shown.bs.modal', function(){
	          scope.$apply(function(){
	            scope.$parent[attrs.visible] = true;
	          });
	        });

	        $(element).on('hidden.bs.modal', function(){
	          scope.$apply(function(){
	            scope.$parent[attrs.visible] = false;
	          });
	        });
	      }
	    };
	})

	.factory('customerService', ['$http', function($http)
	{
		var baseUrl = 'http://localhost:8082/api/customer';
		var dataFactory = [];

		dataFactory.getCustomers = function()
		{
			return $http.get(baseUrl);
		}

		dataFactory.getCustomer = function(customerId)
		{
			return $http.get(baseUrl + '/' + customerId);
		}

		dataFactory.createCustomer = function(customer)
		{
			return $http.post(baseUrl, customer);
		}

		dataFactory.updateCustomer = function(customer)
		{
			return $http.put(baseUrl + '/' + customer._id, customer);
		}

		dataFactory.deleteCustomer = function(customerId)
		{
			return $http.delete(baseUrl + '/' + customerId);
		}

		return dataFactory;
	}])

	.factory('employeeService', ['$http', function($http)
	{
		var baseUrl = 'http://localhost:8082/api/employee';
		var dataFactory = [];

		dataFactory.getEmployees = function()
		{
			return $http.get(baseUrl);
		}

		dataFactory.getAssignableEmployees = function()
		{
			return $http.get(baseUrl + '/state/available');
		}

		dataFactory.getEmployee = function(employeeId)
		{
			return $http.get(baseUrl + '/' + employeeId);
		}

		dataFactory.createEmployee = function(employee)
		{
			return $http.post(baseUrl, employee);
		}

		dataFactory.updateEmployee = function(employee)
		{
			return $http.put(baseUrl + '/' + employee._id, employee);
		}

		dataFactory.updateEmployeeAvailability = function(employee)
		{
			return $http.put(baseUrl + '/setavailable/' + employee._id + '/' + employee.isAssigned, employee);
		}

		dataFactory.deleteEmployee = function(employeeId)
		{
			return $http.delete(baseUrl + '/' + employeeId);
		}

		return dataFactory;
	}])

	// globally set ui-select theme
	.config(["uiSelectConfig", function(uiSelectConfig) {
		uiSelectConfig.theme = "bootstrap";
	}])

	// disable spinner in loading-bar
	.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	    cfpLoadingBarProvider.includeSpinner = false;
	    cfpLoadingBarProvider.latencyThreshold = 50;
	}])

	// route provider
	.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {

		var routes = [
			"admin/newTest",
			"admin/manageTeams",
			"admin/manageProjects",
			"admin/manageTests",
			"admin/manageQuestions",
		    "admin/managePositions",
			"admin/manageSkills"
		];

		function setRoutes(route) {
			var url = '/' + route,
				config = {
					templateUrl: "views/" + route + ".html"
				};

			$routeProvider.when(url, config);
			return $routeProvider;
		}

		routes.forEach(function(route) {
			setRoutes(route);
		});

		$routeProvider
			.when("/", {redirectTo: "/admin/manageTests"})
			.when("/404", {templateUrl: "views/error/404.html"})
			.otherwise({redirectTo: "/404"});
	}])
}())