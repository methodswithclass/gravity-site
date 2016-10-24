settingsModule.factory("settings.service", [function () {

	var g = mcshared.utility;
	var util = mcaccel.utility;

	var _open = function () {};
	var _close = function () {};

	var deviceStandard = {
        standard:{
            text:"standard",
            color:"white-back"
        },
        switched:{
            text:"switched",
            color:"color7-back"
        }
    }

	var setValue = function (val) {

		console.log("set value", val);

    	$("#amount").html(g.truncate(val*100,0));
    	util.setFactor(util.const.factorS, val);
    }

    var getValue = function () {

    	return $("#slider-vertical").slider("value");
    }

    var setDevice = function (getaxis) {

        return {
            x:getaxis(util.const.x) > 0 ? deviceStandard.standard : deviceStandard.switched;
            y:getaxis(util.const.y) > 0 ? deviceStandard.standard : deviceStandard.switched;
        }
    }

	var setup = {

		factor:function () {

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
		},

		direction:function ($open) {

			if ($open) {
				_open = $open;
				setDevice();
			}
			else {
				_open();
			}

		}

	}

	var save = {

		factor:function () {

			
		},

		direction:function ($close) {

			if ($close) {
				_close = $close;
			}
			else {
				_close();
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

		setup.direction();
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
		setup:setup,
		save:save
	}

}]);