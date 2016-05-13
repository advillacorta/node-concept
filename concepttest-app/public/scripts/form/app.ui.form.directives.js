;(function() {
"use strict";

angular.module("app.ui.form.directives", [])


.directive("uiRangeSlider", [function() {
	return {
		restrict: "A",
		link: function(scope, elem, attrs) {
			elem.slider();
		}
	}
}])


}())