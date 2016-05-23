;(function() {
"use strict";

angular.module("app.ui.admin.tests.new", ['ui.sortable'])

	.controller("NewTest", ["$rootScope", "$scope", "$filter", "questionService", "testService",
		function($rootScope, $scope, $filter, questionService, testService)
		{	
			$scope.steps = [true, false];
			$scope.types;
			$scope.availableQuestions
			$scope.selectedQuestions = [];

			$scope.test = {
				questions: [],
			}

			$scope.getAvailableQuestions = function()
			{
				questionService.getQuestions()
				.then(function(response)
				{
					$scope.availableQuestions = response.data;
				});
			}

			$scope.getTestTypes = function()
			{
				testService.getTestTypes()
				.then(function(response)
				{
					$scope.types = response.data;
				});
			}

			$scope.stepNext = function(index) 
			{
				for(var i = 0; i < $scope.steps.length; i++) 
				{
					$scope.steps[i] = false;
				}

				$scope.steps[index] = true;
			}

			$scope.toConfiguration = function(index)
			{
				$scope.selected();

				if(!$scope.selectedQuestions.length == 0)
				{	
					for(var i = 0; i < $scope.steps.length; i++) 
					{
						$scope.steps[i] = false;
					}

					$scope.steps[index] = true;
				}
				else
				{
					toastr.warning('Debe seleccionar preguntas para la evaluaci&oacute;n');
				}
			}

			$scope.showPreview = false;
			$scope.preview = function(index)
			{	
				$scope.test.questions = $scope.selectedQuestions;
				$rootScope.$emit('handlePreviewTest', { test: $scope.test} );
				$scope.showPreview = !$scope.showPreview;
			}

			$scope.stepReset = function() 
			{
				$scope.steps = [true, false, false];
			}

			$scope.selected = function()
			{	
				$scope.selectedQuestions = [];
				for(var i in $scope.availableQuestions)
				{
					var question = $scope.availableQuestions[i];
					if(question.selected)
					{
						$scope.selectedQuestions.push(question);
					}
				}
			}

			$scope.showDetail = false;
			$scope.selectedQuestion;
			$scope.showQuestionDetail = function(index)
			{
				$scope.showDetail = !$scope.showDetail;
				$scope.selectedQuestion = $scope.selectedQuestions[index];
			}

			$scope.save = function(isValid)
			{
				if(isValid)
				{
					$scope.test.questions = $scope.selectedQuestions;
					console.log(angular.toJson($scope.test));
					
					testService.createTest($scope.test)
					.then(function(response)
					{
						toastr.success('Registro satisfactorio');
						// REDIRECCIONAR
					});
				}
			}

			// Init
			$scope.getTestTypes();
			$scope.getAvailableQuestions();
		}
	])
}())