settingsModule.factory("settings.service", ['utility.service', function (utility) {

	var g = mcshared.utility;
	var util = mcaccel.utility;

   	// var x;
	// var y;

	var calibration = {
		x:1,
		y:1
	}

	var axesSet = false;

	var getCalibration = function(dir) {

		return calibration[dir];
	}

	var setSliderValue = function (val) {

		console.log("set value", val);

    	$("#amount").html(g.truncate(val*100,0));
    	util.setFactor(util.const.factorS, val);
    }

    var getSliderValue = function () {

    	return $("#slider-vertical").slider("value");
    }

	var getDirState = function (dir) {

    	return dir < 0 ? true : false;
    }

	var getStateDir = function (state) {

    	return state ? -1 : 1;
    }

    var changeDirection = function (axis, dir) {

		console.log("change axis", axis, "direction", dir);

		util.setAxis(axis, dir);
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
						setSliderValue(ui.value);
					}
			    });

    		},
    		enter:function () {

    			setSliderValue(getSliderValue());
    		},
    		createRegistry:[
    			"setup",
    			"enter"
    		],
    		enterRegistry:[
    			
    		]
    	},
    	direction:{
            axesSet:function(value) {

                if (!value) {
                    return axesSet;
                }

                axesSet = value;

            },
            setOverride:function(dir, value) {
                util.setAxis(dir, util.getAxis(dir)*(-1));
				calibration[dir] = value;

                // util.setAxis(dir, value);
            },
    		registerSetter:function (setter) {

    			settings.direction.setDirection = setter;
    		},
    		changeDirection:function (axis, dir) {

    			changeDirection(axis, dir);
    		},
    		setDirection:function (axis, dir) {

    			console.log("old setDevice", axis, dir);
			},
    		activate:function () {

    			console.log("activate");

			},
			createRegistry:[
				
    		],
			enterRegistry:[
				"activate"
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
		getStateDir:getStateDir,
		getDirState:getDirState,
		settings:settings,
		getCalibration:getCalibration
	}

}]);