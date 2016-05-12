;(function() {
"use strict";

angular.module("app.ui.admin.questions", [])

	.controller("ListQuestions", ["$route", "$rootScope", "$scope", "$filter", "$window", "$timeout", "$location",
		function($route, $rootScope, $scope, $filter, $window, $timeout, $location)
		{
			$scope.datas;
			$scope.searchKeywords;
			$scope.filteredData;
			$scope.numPerPageOpts;
			$scope.numPerPage;
			$scope.currentPage;
			$scope.currentPageStores;

			function getQuestions()
			{
				/*
				skillService.getSkills()
				.then(function(response)
				{
					$scope.datas = response.data;

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
				});
				*/
			}

			$scope.delete = function(id)
			{
				bootbox.confirm("¿Está seguro que desea eliminar la pregunta seleccionada?", function(result)
				{
					if(result)
					{
						/*
						skillService.deleteSkill(id)
						.then(function(response)
						{
							toastr.success('Registro eliminado.');
							reload();
						});
						*/
					}
				});
			}

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

	.controller("NewQuestion", ["$rootScope", "$scope", "$window", "skillTypeService", "skillService",
		function($rootScope, $scope, $window, skillTypeService, skillService)
		{
			$scope.skillTypes;
			$scope.skills;
			$scope.maxAnwers = 4;

			$scope.init = function()
			{
				$scope.question = {
					skillType: '',
					skill: '',
					description: '',
					isMultipleChoice: false,
					answers: []
				}

				skillTypeService.getSkillTypes()
				.then(function(response)
				{
					$scope.skillTypes = response.data;
				});
			}

			$scope.getSkillsByType = function(skillTypeId)
			{	
				skillService.getSkillsByType(skillTypeId)
				.then(function(response)
				{
					$scope.skills = response.data;
				});
			}

			$scope.addAnswer = function()
			{
				$scope.question.answers.push({ description: '', score: 0, isCorrect: false });
			}

			$scope.removeAnswer = function(index)
			{
				$scope.question.answers.splice(index, 1);
			}

			$scope.save = function(isValid)
			{
				if(isValid)
				{
					if($scope.isValidAnswers())
					{
						// Call to service
						console.log(angular.toJson($scope.question));
					}
				}
			}

			$scope.isValidAnswers = function()
			{
				var isValidAnswers = true;
				if($scope.question.isMultipleChoice)
				{
					var countNotMarked = 0;
					for(var i in $scope.question.answers)
					{
						if($scope.question.answers[i].isCorrect)
						{
							break;
						}
						else
						{
							countNotMarked++;
						}
					}

					if(countNotMarked > 0)
					{
						toastr.warning('Debes marcar por lo menos 1 respuesta correcta.');
						isValidAnswers = false;
					}
				}
				else
				{
					var countNotMarked = 0;
					var countMarked = 0;
					for(var i in $scope.question.answers)
					{
						if($scope.question.answers[i].isCorrect)
						{
							countMarked++;
						}
					}

					if(countMarked == 0)
					{
						toastr.warning('Debes marcar una respuesta correcta.');
						isValidAnswers = false;
					}
					else if(countMarked > 1)
					{
						toastr.warning('Debes marcar una sola respuesta correcta.');
						isValidAnswers = false;
					}
				}

				return isValidAnswers;
			}
		}
	])

	.controller("EditQuestion", ["$rootScope", "$scope", "$routeParams", "$window",
		function($rootScope, $scope, $routeParams, $window)
		{
			$scope.skillTypes;
			$scope.skills;
			$scope.maxAnwers = 4;

			$scope.getQuestion = function(id)
			{
				// Call service
				$scope.question;
			}

			$scope.getSkillTypes = function()
			{
				skillTypeService.getSkillTypes()
				.then(function(response)
				{
					$scope.skillTypes = response.data;
				});
			}

			$scope.getSkillsByType = function(skillTypeId)
			{	
				skillService.getSkillsByType(skillTypeId)
				.then(function(response)
				{
					$scope.skills = response.data;
				});
			}

			$scope.addAnswer = function()
			{
				$scope.question.answers.push({ description: '', isCorrect: false });
			}

			$scope.removeAnswer = function(index)
			{
				$scope.question.answers.splice(index, 1);
			}

			$scope.save = function(isValid)
			{
				if(isValid)
				{
					if($scope.isValidAnswers())
					{
						// Call to service
						console.log(angular.toJson($scope.question));
					}
				}
			}

			$scope.isValidAnswers = function()
			{
				var isValidAnswers = true;
				if($scope.question.isMultipleChoice)
				{
					var countNotMarked = 0;
					for(var i in $scope.question.answers)
					{
						if($scope.question.answers[i].isCorrect)
						{
							break;
						}
						else
						{
							countNotMarked++;
						}
					}

					if(countNotMarked > 0)
					{
						toastr.warning('Debes marcar por lo menos 1 respuesta correcta.');
						isValidAnswers = false;
					}
				}
				else
				{
					var countNotMarked = 0;
					var countMarked = 0;
					for(var i in $scope.question.answers)
					{
						if($scope.question.answers[i].isCorrect)
						{
							countMarked++;
						}
					}

					if(countMarked == 0)
					{
						toastr.warning('Debes marcar una respuesta correcta.');
						isValidAnswers = false;
					}
					else if(countMarked > 1)
					{
						toastr.warning('Debes marcar una sola respuesta correcta.');
						isValidAnswers = false;
					}
				}

				return isValidAnswers;
			}

			$rootScope.$on('handleEditQuestion', function(event, params)
			{
				var id = params.id;

				$scope.getSkillTypes();
				$scope.getQuestion(id);
			});
		}
	])

}())