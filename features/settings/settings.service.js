settingsModule.factory("settings.service", ['utility', function (utility) {

	var g = mcshared.utility;
	var util = mcaccel.utility;

   	var x;
	var y;

	var setValue = function (val) {

		console.log("set value", val);

    	$("#amount").html(g.truncate(val*100,0));
    	util.setFactor(util.const.factorS, val);
    }

    var getValue = function () {

    	return $("#slider-vertical").slider("value");
    }

	var getState = function (dir) {

    	return dir < 0 ? true : false;
    }

	var getDir = function (state) {

    	return state < 0 ? -1 : 1;
    }

    var changeDirection = function (dir, state) {

		console.log("settings set direction", dir, "state", getDir(state));

		util.setAxis(dir, getDir(state));
	}

    var settings = {

    	factor:{
    		setup:function () {

    			$( "#slider-vertical" ).slider({
					orientation: "vertical",
					max: 2,
					min: 0.01,
					step:0.01,
					animate:true,
					value: util.getFactor(util.const.factorS),
					slide: function( event, ui ) {
						setValue(ui.value);
					}
			    });

			    setValue(getValue());

    		}
    	},
    	direction:{
    		setSwitched:function () {

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

			},
			setDevice:function (inner) {

				console.log("setdevice", inner);

				settings.direction.setup = inner;
			},
			setup:function (axis, dir) {

				
			}

    	}


    }

	/* =======================================================================================*/
	/* ================================   Stage Functions   ==================================*/
	/* =======================================================================================*/

	var update = function (object, interval) {


	}

	var reset = function () {

		
	}

	var onCreate = function (input) {

	}

	var onEnter = function () {

		console.log(settings);

		for (i in settings) {

			console.log("settings", i);

			settings[i].setup();

		}

	}

	var onStart = function () {


	}

	var onEnd = function () {

	}

	var onLeave = function () {

	}

	/* =======================================================================================*/
	/* =======================================     End      ==================================*/
	/* =======================================================================================*/

	return {
		onCreate:onCreate,
		onEnter:onEnter,
		onStart:onStart,
		onEnd:onEnd,
		onLeave:onLeave,
		update:update,
		reset:reset,
		settings:settings
	}

}]);