settingsModule.factory("settings.service", ['utility.service', function (utility) {

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

		console.log("change direction", dir, "state", state);

		util.setAxis(dir, state);
	}

    var settings = {

		init:{
			init:function () {
				console.log("old init")
			},
			registerInit:function (_init) {
				settings.init = _init;
			}
		},
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
    		changeDirection:function (axis, dir) {

    			changeDirection(axis, getState(dir));
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
		getDir:getDir,
		getState:getState,
		settings:settings
	}

}]);