;(function() {
"use strict";

angular.module("app.ui.ctrls", [])


// Toast Demo Ctrl
.controller("ToastDemoCtrl", ["$scope", "$interval",  function($scope, $timeout) {
	// selection
	$scope.noti = {selected: "Danger"};
	$scope.notifications = ["Warning", "Success", "Info", "Danger"]

	// Radio Models
	$scope.positionModel = "topRight";
	$scope.animModel = "fade";


	var MSGS = [
			"<strong>Error:</strong> Try submitting content again.",
			"a toast message...",
			"another toast message...",
			"<strong>Title:</strong> Toast message with <a href='#na' class='alert-link'>link</a>"
		],
		cntr = 0;

	$scope.toasts = [
		// {
		// 	anim: $scope.animModel,
		// 	type: angular.lowercase($scope.noti.selected), 
		// 	msg: "a toast message..."
		// }
	];
	$scope.closeAlert = function(index) {
		$scope.toasts.splice(index, 1);
	}
	$scope.createToast = function() {
		$scope.toasts.push({
			anim: $scope.animModel,
			type: angular.lowercase($scope.noti.selected),
			msg: MSGS[cntr]
		});
		cntr++;
		if(cntr > 3) cntr = 0;	// reset it
	}

}])


// Alert Demo Ctrl
.controller('AlertDemoCtrl', ["$scope", function ($scope) {
	$scope.alerts = [
		{ type: 'warning', msg: '<strong>Warning:</strong> Backup all your drive.' },
		{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
		{ type: 'success', msg: 'Well done! You successfully read this important alert message.' },
		{ type: 'info', msg: '<strong>Info:</strong> You have got mail.' },
	];

	$scope.addAlert = function() {
		$scope.alerts.push({msg: 'Another alert!'});
	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
}])



// tooltip demo ctrl
.controller('TooltipDemoCtrl', ["$scope", function ($scope) {
	$scope.dynamicTooltip = 'Hello, World!';
	$scope.dynamicTooltipText = 'dynamic';
	$scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';
}])


// pagination demo ctrl
.controller('PaginationDemoCtrl', ["$scope", function ($scope) {
	$scope.totalItems = 64;
	$scope.currentPage = 4;

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.maxSize = 5;
	$scope.bigTotalItems = 175;
	$scope.bigCurrentPage = 1;
}])


// Progressbar demo ctrl
.controller('ProgressDemoCtrl', ["$scope", function ($scope) {
	$scope.max = 200;

	$scope.random = function() {
		var value = Math.floor((Math.random() * 100) + 1);
		var type;

		if (value < 25) {
			type = 'success';
		} else if (value < 50) {
			type = 'info';
		} else if (value < 75) {
			type = 'warning';
		} else {
			type = 'danger';
		}

		$scope.showWarning = (type === 'danger' || type === 'warning');

		$scope.dynamic = value;
		$scope.type = type;
	};
	$scope.random();

	$scope.randomStacked = function() {
		$scope.stacked = [];
		var types = ['success', 'info', 'warning', 'danger'];

		for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
			var index = Math.floor((Math.random() * 4));
			$scope.stacked.push({
				value: Math.floor((Math.random() * 30) + 1),
				type: types[index]
			});
		}
	};
	$scope.randomStacked();
}])



// rating demo ctrl
.controller('RatingDemoCtrl', ["$scope", function ($scope) {
  $scope.rate = 7;
  $scope.max = 10;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };


}]);





// end
}())