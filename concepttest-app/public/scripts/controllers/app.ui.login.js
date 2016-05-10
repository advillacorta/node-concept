;(function() {
"use strict";

angular.module("app.ui.login", [])

// Login
.controller("Login", ["$scope", "$window", "AuthService",
	function($scope, $window, AuthService)
	{
		$scope.user =
		{
			username: '',
			password: ''
		}

		$scope.login = function()
		{
			window.location = '/home';
			/*
			AuthService.signin($scope.user)
			.then(function(message)
			{
				$state.go('inside');
			}, function(error)
			{
				toastr.success('Login failed');
			});
			*/
		};
	}
])

.controller("Signup", ["$scope", "$window", "AuthService",
	function($scope, $window, AuthService)
	{
		$scope.user = 
		{
			username: '',
			password: ''
		}
		
		$scope.signup = function()
		{
			AuthService.signup($scope.user)
			.then(function()
			{
					
			}, function(error)
			{

			});
		}
	}
])

.factory('AuthService', ['$http', function($http)
{
	var baseUrl = 'http://localhost:8082/api/user';
	var dataFactory = {};
	
	dataFactory.signin = function(user)
	{
		return $http.post(baseUrl + '/signin', user);
	}
	
	dataFactory.signup = function(user)
	{
		return $http.post(baseUrl + '/signup', user);
	}
	
	return dataFactory;
}])

}())