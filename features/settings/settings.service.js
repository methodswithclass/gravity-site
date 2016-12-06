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

    	return state ? -1 : 1;
    }

    var changeDirection = function (dir, state) {

		console.log("settings set direction", dir, "state", getDir(state));

		util.setAxis(dir, getDir(state));
	}

    var settings = {

    	factor:{
    		setup:function () {

    			$("#slider-vertical").slider({
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

    		},
    		enter:function () {

    			setValue(getValue());
    		},
    		createRegistry:[
    			"setup",
    			"enter"
    		],
    		enterRegistry:[
    			
    		]
    	},
    	direction:{
    		registerSetter:function (setter) {

    			settings.direction.setDirection = setter;
    		},
    		setDirection:function (axis, dir) {

    			console.log("old setDevice", axis, dir);

			},
    		activate:function () {

    			console.log("activate");

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
			createRegistry:[
				"activate"
    		],
			enterRegistry:[
				
			]

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

		for (i in settings) {

			for (j in settings[i]["createRegistry"]) {

				//console.log("settings", j, settings[i]["loadProcess"][j]);

				var func_name = settings[i]["createRegistry"][j];

				settings[i][func_name].call();
			}

		}

	}

	var onEnter = function () {

		//console.log(settings);

		for (i in settings) {

			for (j in settings[i]["enterRegistry"]) {

				//console.log("settings", j, settings[i]["loadProcess"][j]);

				var func_name = settings[i]["enterRegistry"][j];

				settings[i][func_name].call();
			}

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