;(function() {
"use strict";

angular.module("app.ui.login", [])

// Login
.controller("Login", ["$scope", "$window", 
	function($scope, $window)
	{
		$scope.user = {
			username: '',
			password: ''
		}

		$scope.login = function()
		{
			console.log('User: ' + angular.toJson($scope.user));
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

.controller("Signup", ["$scope", "$window",
	function($scope, $window)
	{
		
	}
])

}())