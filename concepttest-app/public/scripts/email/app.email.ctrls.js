;(function() {
"use strict";

angular.module("app.email.ctrls", [])

// ====== ui-select demo 
.controller("EmailCtrl", ["$scope", "$modal", function($scope, $modal) {

	// labels
	$scope.labelColors = [ "#5974d9", "#19c395", "#fc3644", "#232429", "#f1d44b"]
	$scope.labels = [
		{type: "Work", color: $scope.labelColors[0]},
		{type: "Reciept", color: $scope.labelColors[1]},
		{type: "My Data", color: $scope.labelColors[2]}
	]
	$scope.newlabel = "";

	// List of mails for demo. 
	$scope.emails = [
		{
			subject: "Your order has been shipped. Order No - 1343",
			content: "Please collect the item from your mentioned address",	// this will contain full content with html markup and added by database.
			unread: true,	// mail read/unread
			sender: "Flipkart.com",	// sender name
			date: "30 Sep",
			attachment: true, 	// has attachment or not
		},
		{
			subject: "Meetup at C.P, New Delhi",
			content: "Lorem ipsum dolar sit amet...",
			unread: false,
			sender: "Organizer.com",
			date: "25 Nov",
			attachment: false, 
		},
		{
			subject: "Calling all android developers to join me",
			content: "Pellentesque habitant morbi tristique senectus et netus...",
			unread: true,
			sender: "android.io",
			date: "30 Dec",
			attachment: false, 
		},
		{
			subject: "Meetup at C.P, New Delhi",
			content: "Lorem ipsum dolar sit amet...",
			unread: false,
			sender: "Organizer.com",
			date: "25 Nov",
			attachment: false, 
		},
		{
			subject: "RE: Question about account information V334RE99e: s3ss",
			content: "Hi, Thanks for the reply, I want to know something....",
			unread: false,
			sender: "trigger.io",
			date: "29 Dec",
			attachment: false, 
		},
	];

	// add labels
	$scope.addLabel = function() {
		var l = $scope.labelColors.length,
			c = $scope.labelColors[Math.floor(Math.random()*l)];
		if($scope.newlabel)
			$scope.labels.push({type: $scope.newlabel, color: c});
		$scope.newlabel = "";
	};

	$scope.compose = function() {
		$modal.open({
			templateUrl: "views/email/compose.html",
			size: "lg",
			controller: "EmailCtrl",
			resolve: function() {}
		});

	};

	$scope.composeClose = function() {
		$scope.$close();	// this method is associated with $modal scope which is this.
	};



	// ==== email view
	// ===============
	$scope.toggleReplyBox = function() {
		$scope.toggleReply = true;
	};

}])





// #end 
}())