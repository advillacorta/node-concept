;(function() {
"use strict";
angular.module("app.chart.directives", [])
// chartist
	// type -- Bar, Line, Pie,  
	// options -- options, (null or blank or override opts)
	// data -- data controller scope 
	// responsiveOpts  (optional)
	// <chartist type="Bar" data="ctrldata" class="ct-golden-section" tip="true" opts="" res-opts="" ondraw="method(data)" oncreated="method(data)"></chartist> 
.directive("chartist", [function() {
	return {
		restrict: "EA",
		transclude: true,
		scope: {
			type: "@",
			opts: "=",
			data: "=",
			resOpts: "=",	// responsive options
			tip: "=",
			ondraw: "&",
			oncreated: "&"
		},
		replace: true,
		template: "<div class='ct-chart ng-transclude'></div>",
		link: function(scope, el, attrs) {
			var chartist = new Chartist[scope.type](el[0], scope.data, scope.opts, scope.resOpts);
			scope.$on("chartist.update", function(e, data) {    // add update event.
        		chartist.update(data); 
                
            });

            scope.$watch(scope.data, function(newData, oldData) {
                if(!angular.equals(newData, oldData))
                    chartist.update(newData);
            })

            // events
    		 chartist.on("draw", function(data) {
            	scope.ondraw({data: data});
            	// data expose various thing like type, element etc..
            })
    		
    		chartist.on("created", function(data) {
    			scope.oncreated({data: data}); 	// this data expose different values than 'draw'.
        		// console.log(data);
        		if(scope.tip) {	// .ct-point, .ct-slice, .ct-bar
        			var type;
        			if(scope.type == "Line") 
        				type = el.find(".ct-point");
        			else if(scope.type == "Bar") 
        				type = el.find(".ct-bar");
        			else if(scope.type == "Pie")
        				type = el.find(".ct-slice");
        
        			el.find(".tooltip").remove();	// remove the previous if any.
        			var tooltip = el.append("<div class='tooltip in'></div>").find(".tooltip");

            		type.on("mouseenter", function() {
            			var self = $(this), parent = self.parent(),
            				value, seriesName;

        					if(scope.type === "Pie") {
        						seriesName = parent.find(".ct-label").html();
        						value = ""
        					}
        					else if(scope.type = "Line" || scope.type == "Bar") {
        						value = self.attr("ct:value");
    							seriesName = parent.attr("ct:series-name") || "";
    							if(seriesName) 
    								seriesName += " : ";
        					}
        						
    					tooltip
    						.html("<div class='tooltip-inner'>" + seriesName  + value + "</div>")
    						.show();

            		})

            		type.on("mouseleave", function() {
            			tooltip.hide();
            		})

            		el.on("mousemove", function(e) {
        				tooltip.css({
						    left: (e.offsetX || e.originalEvent.layerX) - tooltip.width()/2 - 10,
						    top: (e.offsetY || e.originalEvent.layerY) - tooltip.height() - 10
						});
            		})
        		}
        	})
			// #end link
		}
	}
}]);


}())
