controllerModule.controller("SettingsController", ['$scope', 'global', 'states', 'data.service', 'settings.service', 'utility', function ($scope, g, states, data, settings, utility) {

    var self = this;

    var util = mcaccel.utility;

	console.log(" ");
	console.log("settings controller");
	
	var x;
	var y;

    $scope.xswitched = utility.deviceStandard.standard;
    $scope.yswitched = utility.deviceStandard.standard;

    var setDevice = function (axes, dir) {

        $scope[axes == util.const.x ? "xswitched" : "yswitched"] = dir > 0 ? utility.deviceStandard.standard : utility.deviceStandard.switched;
    }


    var getState = function (dir) {

    	return dir < 0 ? true : false;
    }

    var getDir = function (state) {

    	return state ? -1 : 1;
    }

    var changeDirection = function (dir, state) {

		console.log("settings set direction", dir, "state", getDir(state));

		util.setAxis(dir, getDir(state));
	}
    
    var setSwitched = function () {

    	console.log("set switched");

    	x = $("[name='setting-x-axis']");
    	y = $("[name='setting-y-axis']");

    	x.bootstrapSwitch({
    		state:getState(util.getAxis(util.const.x)),
    		animate:true,
    		handleWidth:"350px",
    		onSwitchChange:function (event, state) {
    			changeDirection(util.const.x, state);
    		}
    	});

    	y.bootstrapSwitch({
    		state:getState(util.getAxis(util.const.y)),
    		animate:true,
    		handleWidth:"350px",
    		onSwitchChange:function (event, state) {
    			changeDirection(util.const.y, state);
    		}

    	});

    	$(".bootstrap-switch").css({height:"80%", top:"10%"});
    	$(".bootstrap-switch-container").css({height:"100%"});
    	$(".bootstrap-switch-handle-on").html("<div class='absolute vcenter font-50'>switched</div>");
    	$(".bootstrap-switch-handle-off").html("<div class='absolute vcenter font-50'>standard</div>");

	}

	setTimeout(function () {

    	settings.setup.factor();
    	settings.setup.direction(setSwitched, setDevice);

        // var device = settings.setDevice(util.getAxis);

        // $scope.xswitched = device.x;
        // $scope.yswitched = device.y;

    }, 500);


}]);