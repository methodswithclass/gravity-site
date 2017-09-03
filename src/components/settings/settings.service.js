settingsModule.factory("settings.service", ['utility.service', 'cookie.service', 'data.service', function (utility, cookie, data) {

	var g = mcshared.utility;
    var util = mcaccel.utility;


	var calibration = {
        i: 1,
        j: 1
    }

    var defaultObj = {
        id: "default",
        size: 200,
        color: "black"
    }

    var settings = {
        closeSetting: function () {

            console.log("old close setting");
        },
        registerClose: function (_close) {

            settings.closeSetting = _close;
        },
        obj: {
            min: 50,
            max: 700,
            size: cookie.getCookie(utility.c.objSizeKey) || 350,
            obj: cookie.getCookie(utility.c.objKey) || "marble6",
            currentObj: function () {
                return data.getMarble(settings.obj.obj);
            },
            setObj: function (marble) {
                settings.obj.obj = marble.id;
                cookie.setCookie(utility.c.objKey, marble.id);

                var marbleCookie = cookie.getCookie(utility.c.objKey);

                console.log("marbleCookie", marbleCookie);
            },
            currentSize: function () {
                return settings.obj.size;
            },
            setSize: function (size) {

                settings.obj.size = size;
                cookie.setCookie(utility.c.objSizeKey, size);
            }
        },
    	factor:{
            default:1,
            min:0.2,
            max: 2,
			getSessionFactor:function() {

    			return parseFloat(cookie.getCookie(utility.c.sessionFactorKey) || util.getFactor(util.const.factorS));
			},
			setSessionFactor:function (val) {

                util.setFactor(util.const.factorS, val);
                cookie.setCookie(utility.c.sessionFactorKey, val);
			},
    		createRegistry:[

    		],
    		enterRegistry:[
    			
    		]
    	},
    	axes:{
    		getCalibration:function(dir) {

                return parseInt(cookie.getCookie((dir == "j" ? utility.c.axisYKey : utility.c.axisXKey)) || calibration[dir]);
            },
            setOverride: function (dir, value) {

                var currValue = cookie.getCookie(dir == "j" ? utility.c.axisYKey : utility.c.axisXKey) || util.getAxis(dir);
                util.setAxis(dir, currValue * (-1));
                cookie.setCookie((dir == "j" ? utility.c.axisYKey : utility.c.axisXKey), currValue * -1);
                //calibration[dir] = value;
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