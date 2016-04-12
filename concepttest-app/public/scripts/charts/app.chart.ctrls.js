;(function() {
	"use strict";

angular.module("app.chart.ctrls", [])


.controller("ChartistDemoCtrl", ["$scope", "$interval", function($scope, $interval) {
	// line/bar data
	$scope.linedata = {
		labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
		series: [
		    [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
		]
	};

	$scope.lineopts = {
		axisY: {
			offset: 25,
			labelOffset: {
				y: 5
			}
		}
	}

	// area data
	$scope.areadata = {
		labels: [1, 2, 3, 4, 5, 6, 7, 8],
		series: [
			[1, 2, 3, 1, -2, 0, 1, 0],
			[-2, -1, -2, -1, -2.5, -1, -2, -1],
			[0, 0, 0, 1, 2, 2.5, 2, 1],
			[2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]
		]
	}

	$scope.areaopts = angular.extend({
		showArea: true,
		showLine: false,
		fullWidth: true,
		showPoint: false,
		axisX: {
			showLabel: false,
			showGrid: false
		}
	}, $scope.lineopts);

	// bi-polar bar chart
	$scope.bipolardata = {
		labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
		series: [
			[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
		]
	}

	// bar data
	$scope.bardata = {
		labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		series: [
			[5, 4, 3, 7, 5, 10, 3],
			[3, 2, 9, 5, 4, 6, 4]
		]
	}

	// stack bar chart
	$scope.stackbardata = {
		labels: ['Q1', 'Q2', 'Q3', 'Q4'],
		series: [
			[800000, 1200000, 1400000, 1300000],
			[200000, 400000, 500000, 300000],
			[100000, 200000, 400000, 600000]
		]
	};

	$scope.stackbaropts = {
		stackBars: true,
		axisY: {
			labelInterpolationFnc: function(value) {
		    	return (value / 1000) + 'k';
		    }
		}
	};

	$scope.stackdraw = function(data) {
		if(data.type === 'bar') {
		    data.element.attr({
		      style: 'stroke-width: 40px'
		    });
		}
	}

	// pie chart
	$scope.piechartdata = {
		series: [20, 30, 25, 25],
		labels: ["20%", "30%", "25%", "25%"]
	}
	

	// Donut Pie
	$scope.donutdata = {
		series: [48, 17, 19, 16],
		labels: ["Chrome: 48%", "Firefox: 17%", "IE: 19%", "Other: 16%"]	
	}
	$scope.donutopts = {
		donut: true,
		donutWidth: 30,
		startAngle: 0,
		total: 0,
		showLabel: true,
		labelOffset: 25,
		labelDirection: "explode"
	}

	$scope.donutdraw = function(data) {
		var colors = ['#6e94ea', '#5bb2ee', '#4bdbaa', '#cce386', '#998f90'];
		if(data.type == "label") {
			// console.log(data.index);
			data.element._node.style.fill = colors[data.index];
		}
	}

	// peek draw
	$scope.peekdraw = function(data) {
		if(data.type === 'bar') {
			// We use the group element of the current series to append a simple circle with the bar 
			// peek coordinates and a circle radius that is depending on the value
			data.group.append(new Chartist.Svg('circle', {
				cx: data.x2,
				cy: data.y2,
				r: Math.abs(data.value) * 2 + 3,
				style: "fill: #4bdbaa"
			}, 'ct-slice'));

			data.element._node.style.stroke = '#4bdbaa';
		}
	}


	// easy pie chart options
	$scope.epcOpts = {
		size: 180,
		lineWidth: 12,
		lineCap: "square",
		barColor: "#38b4ee"
	};
	$scope.epcPercent = 80;







}])


}())

