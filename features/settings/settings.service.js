settingsModule.factory("settings.service", ['utility', function (g) {

	var _open = function () {};
	var _close = function () {};

	var setValue = function (val) {

		console.log("set value", val);

    	$("#amount").html(g.truncate(val*100,0));
    	g.setFactor(g.c.factorS, val);
    }

    var getValue = function () {

    	return $("#slider-vertical").slider("value");
    }

	var setup = {

		factor:function () {

			$( "#slider-vertical" ).slider({
				orientation: "vertical",
				max: 2,
				min: 0.01,
				step:0.01,
				animate:true,
				value: g.getFactor(g.c.factorS),
				slide: function( event, ui ) {
					setValue(ui.value);
				}
		    });

		    setValue(getValue());
		},

		direction:function ($open) {

			if ($open) {
				_open = $open;
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