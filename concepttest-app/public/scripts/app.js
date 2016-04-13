;(function() 
{
	"use strict";

	angular.module("app", 
	[
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
			"admin/skillTypes", "admin/skillLevels", "admin/skills", "admin/positions",
			"admin/newSkillType", "admin/newSkillLevel", "admin/newSkill",
			"admin/editSkillType", "admin/editSkill", "admin/editSkillLevel"
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
			.when("/", {redirectTo: "/admin/skillTypes"})
			.when("/404", {templateUrl: "views/error/404.html"})
			.otherwise({redirectTo: "/404"});
	}])
}())


