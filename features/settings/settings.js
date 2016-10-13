settingsModule.directive("settings", ['states', 'send', 'settings.service', 'utility', function (states, send, settings, g) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"features/settings/settings.html",
		link:function ($scope, element, attr) {

			
			settings.scope($scope);


			/*********************  session factor  ***************************/

			var setValue = function (val) {

				console.log("set value", val);

		    	$("#amount").html(g.truncate(val*100,0));
		    	g.setFactor(g.c.factorS, val);
		    }

		    var getValue = function () {

		    	return $("#slider-vertical").slider("value");
		    }

		    setTimeout(function () {

		    	$( "#slider-vertical" ).slider({
					orientation: "vertical",
					//range: "min",
					max: 2,
					min: 0.01,
					step:0.01,
					//height:"400px",
					animate:true,
					value: g.getFactor(g.c.factorS),
					slide: function( event, ui ) {
						setValue(ui.value);
					}
			    });

			    setValue(getValue());

		    }, 500);
			
		    
		    /*********************  axes  ***************************/



		    $scope.directions = {
		    	x:g.c.xDir,
		    	y:g.c.yDir
		    }

		    $scope.axisSwitched = {
		    	x:false,
		    	y:false
		    }
		    
		    var setSwitched = function () {

			    $scope.axisSwitched = {
			    	x:(g.getDirection(g.c.xDir) < 0 ? true : false),
			    	y:(g.getDirection(g.c.yDir) < 0 ? true : false)
			    }

			}

		    settings.open(setSwitched);

			$scope.changeDirection = function (dir) {

				console.log("set direction", dir, dir == g.c.xDir ? $scope.axisSwitched.x : $scope.axisSwitched.y);

				// var current = $scope.axisSwitched[dir == g.c.xDir ? "x" : "y"];

				// $scope.axisSwitched[dir == g.c.xDir ? "x" : "y"] = !current;

				g.setDirection(dir, dir == g.c.xDir ? ($scope.axisSwitched.x ? -1 : 1) : ($scope.axisSwitched.y ? -1 : 1));
			}

		}
	}

}]);