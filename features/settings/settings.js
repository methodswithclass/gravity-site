settingsModule.directive("settings", ['states', 'send', 'settings.service', 'utility', function (states, send, settings, g) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"features/settings/settings.html",
		link:function ($scope, element, attr) {

			var x;
			var y;

		    // $scope.directions = {
		    // 	x:g.c.xDir,
		    // 	y:g.c.yDir
		    // }

		    // $scope.axis = {
		    // 	x:1,
		    // 	y:1
		    // }

		    var getState = function (dir) {

		    	return dir < 0 ? true : false;
		    }

		    var getDir = function (state) {

		    	return state ? -1 : 1;
		    }

		    var changeDirection = function (dir, state) {

				console.log("settings set direction", dir, "state", getDir(state));

				g.setDirection(dir, getDir(state));
			}
		    
		    var setSwitched = function () {

		    	console.log("set switched");

		    	x = $("[name='setting-x-axis']");
		    	y = $("[name='setting-y-axis']");

		    	x.bootstrapSwitch({
		    		state:getState(g.getDirection(g.c.xDir)),
		    		animate:true,
		    		handleWidth:"350px",
		    		onSwitchChange:function (event, state) {
		    			changeDirection(g.c.xDir, state);
		    		}
		    	});

		    	y.bootstrapSwitch({
		    		state:getState(g.getDirection(g.c.yDir)),
		    		animate:true,
		    		handleWidth:"350px",
		    		onSwitchChange:function (event, state) {
		    			changeDirection(g.c.yDir, state);
		    		}

		    	});

		    	$(".bootstrap-switch").css({height:"80%", top:"10%"});
		    	$(".bootstrap-switch-container").css({height:"100%"});
		    	// $(".bootstrap-switch-handle-on").css({top:"50%", translateY:"-50%", fontSize:"40px"});
		    	// $(".bootstrap-switch-handle-off").css({top:"50%", translateY:"-50%", fontSize:"40px"});

		    	$(".bootstrap-switch-handle-on").html("<div class='absolute vcenter font-50'>switched</div>");
		    	$(".bootstrap-switch-handle-off").html("<div class='absolute vcenter font-50'>standard</div>");

		    	// x.bootstrapSwitch();
		    	// y.bootstrapSwitch();

			}

			setTimeout(function () {

		    	settings.setup.factor();
		    	settings.setup.direction(setSwitched);

		    }, 500);

		}
	}

}]);