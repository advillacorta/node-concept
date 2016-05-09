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

}())