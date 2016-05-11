;(function() {
"use strict";

angular.module("app.ui.admin.questions", [])

	.controller("ListQuestions", ["$route", "$rootScope", "$scope", "$filter", "$window", "$timeout", "$location",
		function($route, $rootScope, $scope, $filter, $window, $timeout, $location)
		{
			$scope.showNew = false;
		    $scope.toggleNew = function()
		    {
		        $scope.showNew = !$scope.showNew;
		    };

			$scope.showEdit = false;
		    $scope.toggleEdit = function(id)
		    {
		        $scope.showEdit = !$scope.showEdit;
		        $rootScope.$emit('handleEditQuestion', { id: id} );
		    };

		    function reload()
		    {
		    	$route.reload();
		    }

		    $rootScope.$on('closeNewQuestionModal', function(event, params)
		    {
		    	$scope.showNew = !$scope.showNew
		    	$timeout(reload, 800);
		    });

		    $rootScope.$on('closeEditQuestionModal', function(event, params)
		    {
		    	$scope.showEdit = !$scope.showEdit
		    	$timeout(reload, 800);
		    });
		}
	])

	.controller("NewQuestion", ["$rootScope", "$scope", "$window",
		function($rootScope, $scope, $window)
		{
			$scope.init = function()
			{
				$scope.initial = {
					type: '',
					description: '',
					isMultipleChoice: true,
					answers: []
				}

				$scope.question = $scope.initial;
			}

			$scope.addAnswer = function()
			{
				$scope.question.answers.push({ description: '', isCorrect: false });
			}

			$scope.removeAnswer = function(index)
			{
				$scope.question.answers.splice(index, 1);
			}

			$scope.reset = function()
			{
				$scope.question = $scope.initial;
			}

			$scope.save = function(isValid)
			{
				if(isValid)
				{

				}
			}
		}
	])

	.controller("EditQuestion", ["$rootScope", "$scope", "$routeParams", "$window",
		function($rootScope, $scope, $routeParams, $window)
		{

		}
	])

}())