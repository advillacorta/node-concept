;(function() {
"use strict";

angular.module("app.ui.admin.tests.edit", ['ui.sortable'])

	.controller("EditTest", ["$rootScope", "$scope", "$filter", "$route", "$routeParams", "$window", "questionService", "testService",
		function($rootScope, $scope, $filter, $route, $routeParams, $window, questionService, testService)
		{	
			$scope.steps = [true, false];
			$scope.types;
			$scope.availableQuestions
			$scope.selectedQuestions = [];

			$scope.test = {
				questions: [],
			}

			$scope.init = function()
			{
				testService.getTest($routeParams.id)
				.then(function(response)
				{
					console.log(response.data);
					$scope.test = response.data;

					// Inicializando datos para pantalla
					$scope.test.isActive = "" + $scope.test.isActive;
					$scope.selectedQuestions = $scope.test.questions;

					// Init
					$scope.getTestTypes();
					$scope.getAvailableQuestions();
				});
			}

			$scope.getAvailableQuestions = function()
			{
				questionService.getQuestions()
				.then(function(response)
				{
					$scope.availableQuestions = response.data;

					for(var i in $scope.availableQuestions)
					{
						var availableQuestion = $scope.availableQuestions[i];
						for(var j in $scope.selectedQuestions)
						{
							var selectedQuestion = $scope.selectedQuestions[j];
							if(availableQuestion._id == selectedQuestion._id)
							{
								availableQuestion.selected = true;
							}
						}
					}
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

			$scope.cancel = function()
			{
				bootbox.confirm("¿Está seguro que desea cancelar la edici&oacute;n de la evaluaci&oacute;n?", function(result)
				{
					if(result)
					{
						window.location.href = '#/admin/manageTests';
					}
				});
			}

			$scope.save = function(isValid)
			{
				console.log("isValid: '" + isValid + "'");
				if(isValid)
				{

					$scope.test.questions = $scope.selectedQuestions;
					console.log(angular.toJson($scope.test));
					
					testService.updateTest($scope.test)
					.then(function(response)
					{
						toastr.success('Edici&oacute;n satisfactoria');
						$window.location.href = '#/admin/manageTests';
					});
				}
			}
		}
	])
}())