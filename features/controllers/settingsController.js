controllerModule.controller("SettingsController", ['$scope', 'global', 'states', 'data.service', 'settings.service', 'utility', function ($scope, g, states, data, settings, util) {


	console.log(" ");
	console.log("settings controller");
	
	var x;
	var y;

    var getState = function (dir) {

    	return dir < 0 ? true : false;
    }

    var getDir = function (state) {

    	return state ? -1 : 1;
    }

    var changeDirection = function (dir, state) {

		console.log("settings set direction", dir, "state", getDir(state));

		util.setDirection(dir, getDir(state));
	}
    
    var setSwitched = function () {

    	console.log("set switched");

    	x = $("[name='setting-x-axis']");
    	y = $("[name='setting-y-axis']");

    	x.bootstrapSwitch({
    		state:getState(util.getDirection(util.c.xDir)),
    		animate:true,
    		handleWidth:"350px",
    		onSwitchChange:function (event, state) {
    			changeDirection(util.c.xDir, state);
    		}
    	});

    	y.bootstrapSwitch({
    		state:getState(util.getDirection(util.c.yDir)),
    		animate:true,
    		handleWidth:"350px",
    		onSwitchChange:function (event, state) {
    			changeDirection(util.c.yDir, state);
    		}

    	});

    	$(".bootstrap-switch").css({height:"80%", top:"10%"});
    	$(".bootstrap-switch-container").css({height:"100%"});
    	$(".bootstrap-switch-handle-on").html("<div class='absolute vcenter font-50'>switched</div>");
    	$(".bootstrap-switch-handle-off").html("<div class='absolute vcenter font-50'>standard</div>");

	}

	setTimeout(function () {

    	settings.setup.factor();
    	settings.setup.direction(setSwitched);

    }, 500);


}]);