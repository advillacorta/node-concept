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
		
		/* App Modules */
		"app.directives",
		//"app.services",
		"app.ctrls",
		
		"app.ui.admin.skill",
		"app.ui.admin.skill.types",
		"app.ui.admin.skill.levels",
		"app.ui.admin.position"
	])

	.directive('modal', function () {
	    return {
	      template: '<div class="modal fade">' + 
	          '<div class="modal-dialog">' + 
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
	
	.factory('skillService', ['$http', function($http)
	{
		var baseUrl = 'http://localhost:8082/api/skill';
		var dataFactory = {};

		dataFactory.getSkills = function()
		{
			return $http.get(baseUrl);
		}

		dataFactory.getSkill = function(id)
		{
			return $http.get(baseUrl + '/' + id);
		}

		dataFactory.createSkill = function(skill)
		{
			return $http.post(baseUrl, skill);
		}

		dataFactory.updateSkill = function(skill)
		{
			return $http.put(baseUrl + '/' + skill._id, skill);
		}

		dataFactory.deleteSkill = function(id)
		{
			return $http.delete(baseUrl + '/' + id);
		}

		return dataFactory;
	}])

	.factory('skillLevelService', ['$http', function($http)
	{
		var baseUrl = 'http://localhost:8082/api/skillLevel';
		var dataFactory = {};

		dataFactory.getSkillLevels = function()
		{
			return $http.get(baseUrl);
		}

		dataFactory.getSkillLevel = function(id)
		{
			return $http.get(baseUrl + '/' + id);
		}

		dataFactory.createSkillLevel = function(skill)
		{
			return $http.post(baseUrl, skill);
		}

		dataFactory.updateSkillLevel = function(skill)
		{
			return $http.put(baseUrl + '/' + skill._id, skill);
		}

		dataFactory.deleteSkillLevel = function(id)
		{
			return $http.delete(baseUrl + '/' + id);
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
			.when("/", {redirectTo: "/admin/manageSkills"})
			.when("/404", {templateUrl: "views/error/404.html"})
			.otherwise({redirectTo: "/404"});
	}])
}())