;(function() {
"use strict";

angular.module("app.directives", [])

.directive("toggleNavMin", ["$rootScope", function($rs) {

	return function(scope, el, attrs) {
		var app = $("#app");

		$rs.$watch("isMobile", function() {
			if($rs.isMobile) 
				app.removeClass("nav-min");
		});		
		
		el.on("touchstart click", function(e) {
			if(!$rs.isMobile) {
				app.toggleClass("nav-min");
				$rs.$broadcast("nav.reset"); // dispatch event downwards notifying the event registerar.
				$rs.$broadcast("chartist.update");	// event register by chartist directive
			}
			e.preventDefault();
		});
	}
	
}])


.directive("collapseNavAccordion", [function() {
	return {
		restrict: "A",
		link: function(scope, el, attrs) {
			var lists = el.find("ul").parent("li"),	// target li which has sub ul
				a = lists.children("a"),
				listsRest = el.children("ul").children("li").not(lists),
				aRest = listsRest.children("a"),
				app = $("#app"),
				stopClick = 0;


			a.on("touchstart click", function(e) {
				if(e.timeStamp - stopClick > 300) {
					// disable click if nav is in mini-style || horizontal nav
					if(app.hasClass("nav-min") && window.innerWidth > 767) return;
					
					var self = $(this),
						parent = self.parent("li");
					a.not(self).next("ul").slideUp();	
					self.next("ul").slideToggle();	

					// hide/show open class
					lists.not(parent).removeClass("open");
					parent.toggleClass("open");

					stopClick = e.timeStamp;
				}
				e.preventDefault();
			});

			// slide up nested nav when clicked on arest
			aRest.on("touchstart click", function() {
				var parent = aRest.parent("li");
				lists.not(parent).removeClass("open").find("ul").slideUp();
			})

			// reset nav when navigation in mini mode
			scope.$on("nav.reset", function(e) {	// for use in toggleNavMin directive
				a.next("ul").removeAttr("style");
				lists.removeClass("open");
				e.preventDefault();
			});

		}
	}
}])

// Toggle off-canvas nav in mobile browser
.directive("toggleOffCanvas", ["$rootScope", function($rs) {
	return {
		restrict: "A",
		link: function(scope, el, attrs) {
			el.on("touchstart click", function() {
				$("#app").toggleClass("on-canvas");
			});
		}
	}

}])



// highlight active nav
.directive("highlightActive", ["$location", function($location) {
	return {
		restrict: "A",
		link: function(scope, el, attrs) {
			var links = el.find("a"),
				path = function() {return $location.path()},
				highlightActive = function(links, path) {
					var path = "#" + path;
					angular.forEach(links, function(link) {
						var link = angular.element(link),
							li = link.parent("li"),
							href = link.attr("href");

						if(li.hasClass("active")) 
							li.removeClass("active");
						if(path.indexOf(href) == 0)
							li.addClass("active");

						console.log(path, href,  path.indexOf(href));
					})
				};

			highlightActive(links, $location.path());
			scope.$watch(path, function(newVal, oldVal) {
				if(newVal == oldVal) return;
				highlightActive(links, $location.path());
			})
		}
	}

}])



.directive("uiCheckbox", [function() {
	return {
		restrict: "A",
		link: function(scope, el, attrs) {
			
			el.children().on("touchstart click", function(e) {	
				if(el.hasClass("checked")) {
					el.removeClass("checked");
					el.children().removeAttr("checked");
				}
				else {
					el.addClass("checked");
					el.children().attr("checked", true);
				}
				e.stopPropagation();
					
			});
		}
	}
}])


.directive("customScrollbar", ["$interval", function($interval) {
	return {
		restrict: "A",
		link: function(scope, el, attrs) {
			// if(!scope.$isMobile) // not initialize for mobile
			// {
				el.perfectScrollbar({
					suppressScrollX: true
				});

				$interval(function() {
					if(el[0].scrollHeight >= el[0].clientHeight)
						el.perfectScrollbar("update");
				}, 60);
			// }	
				
		}
	}
}])


// add full body class for custom pages.
.directive("customPage", [function() {
	return {
		restrict: "A",
		controller: ["$scope", "$element", "$location", function($scope, $element, $location) {
			var path = function() {return $location.path()};
			var addBg = function(path) {

				$element.removeClass("body-full");

				switch(path) {
					case "/404": case "/pages/404" : case "/pages/login" : 
					case "/pages/register" : case "/pages/forget-pass" : 
					case "/pages/lock-screen":
						$element.addClass("body-full");
				}
				
			};

			addBg($location.path());

			$scope.$watch(path, function(newVal, oldVal) {
				if(angular.equals(newVal, oldVal)) return;
				addBg($location.path());	
			})
			
		}]
	}
}])









}())






