;(function() {
"use strict";

angular.module("app.ui.form.ctrls", [])

// ====== ui-select demo 
.controller("UISelectDemoCtrl", ["$scope", function($s) {
	$s.person = {};
	// demo one
	$s.people = [
	    { name: 'Adam',      email: 'adam@mail.com'},
	    { name: 'Amalie',    email: 'amalie@mail.com'},
	    { name: 'Nicolás',   email: 'nicolas@mail.com'},
	    { name: 'Wladimir',  email: 'wladimir@mail.com'},
	    { name: 'Samantha',  email: 'samantha@mail.com'},
	    { name: 'Estefanía', email: 'estefanía@mail.com'},
	    { name: 'Natasha',   email: 'natasha@mail.com'},
	    { name: 'Nicole',    email: 'nicole@mail.com'},
	    { name: 'Adrian',    email: 'adrian@mail.com'}
	];

	$s.state = {};
	$s.timezone = [ 
		{tag: 1, name: "Alaska"},
		{tag: 1, name: "Hawaii"},
		{tag: 2, name: "California"},
		{tag: 2, name: "Nevada"},
		{tag: 2, name: "Oregon"},
		{tag: 2, name: "Washington"},
		{tag: 3, name: "Arizona"},
		{tag: 3, name: "Colorado"},
		{tag: 3, name: "Idaho"},
		{tag: 3, name: "Montana"},
		{tag: 3, name: "Nebraska"},
		{tag: 3, name: "New Mexico"},
		{tag: 3, name: "North Dakota"},
		{tag: 3, name: "Utah"},
		{tag: 3, name: "Wyoming"},
		{tag: 4, name: "Alabama"},
		{tag: 4, name: "Arkansas"},
		{tag: 4, name: "Illinois"},
		{tag: 4, name: "Iowa"},
		{tag: 4, name: "Kansas"},
		{tag: 4, name: "Kentucky"},
		{tag: 4, name: "Louisiana"},
		{tag: 4, name: "Minnesota"},
		{tag: 4, name: "Mississippi"},
		{tag: 4, name: "Missouri"},
	];

 $s.timezoneFn = function (item){
 	switch(item.tag) {
 		case 1: return "Alaskan/Hawaiian Time Zone";
 		case 2: return "Pacific Time Zone";
 		case 3: return "Moutain Time Zone";
 		case 4: return "Central Time Zone";
 	}

  };


	// Multiple Select
	$s.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise', 'Array of Strings'];
	$s.multipleDemo = {};
	$s.multipleDemo.colors = ['Blue','Red', 'Array of Strings'];
	$s.multipleDemo.selectedPeopleWithGroupBy = [$s.people[8], $s.people[0]];

	$s.someGroupFn = function (item){
		if (item.name[0] >= 'A' && item.name[0] <= 'M')
			return 'From A - M';
		if (item.name[0] >= 'N' && item.name[0] <= 'Z')
			return 'From N - Z';
	};

}])


// === datepicker
.controller("DatepickerDemoCtrl", ["$scope", function($scope) {
	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened = true;
	};

}])

// == typehead
.controller("TypeaheadDemoCtrl", ["$scope", function($scope) {

	$scope.selected = undefined;
  	$scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 
	  	'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
	  	'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 
	  	'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
	  	'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
	];
}])


// === form wizard
.controller("FormWizardCtrl", ["$scope", function($scope) {
	$scope.steps = [true, false, false];

	$scope.stepNext = function(index) {
		for(var i = 0; i < $scope.steps.length; i++) {
			$scope.steps[i] = false;
		}

		$scope.steps[index] = true;
	}

	$scope.stepReset = function() {
		$scope.steps = [true, false, false];
	}

}])

// #end
}())