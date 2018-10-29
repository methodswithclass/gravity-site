settingsModule.factory("settings.service", ['utility.service', 'cookie.service', 'data.service', 'toast.service', function (utility, cookie, data, $toast) {

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
        displayFeedback:function () {

            console.log("display feedback");


            $toast.showToast({message:"settings saved", duration:1500, delay:600});

        },
        closeSetting: function () {

            console.log("old close setting");
        },
        registerClose: function (_close) {

            console.log("register close")

            settings.closeSetting = function () {

                console.log("close settings");

                _close();

                settings.displayFeedback();


            }
        },
        obj: {
            min: 50,
            max: 700,
            size: cookie.getCookie(utility.c.objSizeKey) || utility.marble.get.size(),
            obj: cookie.getCookie(utility.c.objKey) || utility.marble.get.id(),
            currentObj: function () {
                return data.getMarble(settings.obj.obj);
            },
            setObj: function (marble) {
                settings.obj.obj = marble.id;
                utility.marble.set.id(marble.id);
            },
            save:function () {

                console.log("save obj \n\n\n");

                cookie.setCookie(utility.c.objKey, utility.marble.get.id());
                cookie.setCookie(utility.c.objSizeKey, utility.marble.get.size());

            },
            currentSize: function () {
                return settings.obj.size;
            },
            setSize: function (size) {

                settings.obj.size = size;
                utility.marble.set.size(size);
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
			},
            save:function () {

                console.log("save factor \n\n\n");

                cookie.setCookie(utility.c.sessionFactorKey, util.getFactor(util.const.factorS));

            },
    		createRegistry:[

    		],
    		enterRegistry:[
    			
    		]
    	},
    	axes:{
    		getCalibration:function(dir) {

                return parseInt(cookie.getCookie((dir == "j" ? utility.c.axisYKey : utility.c.axisXKey)) || util.getAxis(dir));
            },
            reverseCalibration: function (dir) {
                
                util.setAxis(dir, settings.axes.getCalibration(dir)*(-1));

            },
            save:function () {

                console.log("save axes \n\n\n");

                cookie.setCookie(utility.c.axisYKey, util.getAxis("j"));
                cookie.setCookie(utility.c.axisXKey, util.getAxis("i"));
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