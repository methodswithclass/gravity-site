settingsModule.factory("settings.service", ['utility.service', function (utility) {

	var g = mcshared.utility;
	var util = mcaccel.utility;

	var calibration = {
        i: 1,
        j: 1
    }

    var settings = {
    	factor:{
            default:1,
            min:0.2,
            max: 2,
            normalize:function (factor, which) {

                var max = settings.factor.max;
                var min = settings.factor.min;

                var result;

                if (which == "minmax") {
                    result = (max-min)/factor;
                }
                else {
                    result = factor / (max - min);
                }

                console.log("normalize", result);

                return result;
            },
            convert:function (value, dir) {

                return (dir == "up" && value < 1) ? value * 100 : ((dir == "down" && value > 1) ? value / 100 : value);
            },
			getSessionFactor:function() {

    			return util.getFactor(util.const.factorS);
			},
			setSessionFactor:function (val) {

    			util.setFactor(util.const.factorS, val)
			},
    		createRegistry:[

    		],
    		enterRegistry:[
    			
    		]
    	},
    	axes:{
    		getCalibration:function(dir) {

                return calibration[dir];
            },
            setOverride:function(dir, value) {
                util.setAxis(dir, util.getAxis(dir)*(-1));
                calibration[dir] = value;
            },
			setDirection:function (axis, dir) {

    			util.setAxis(axis, dir);
			},
            getStateFromDir:function (dir) {

                return dir < 0 ? true : false;
            },
			getDirFromState:function (state) {

                return state ? -1 : 1;
            },
			createRegistry:[

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