settingsModule.factory("settings.service", ['utility', function (g) {

	var _open = function () {};
	var _close = function () {};

	var open = function ($open) {

		if ($open) {
			_open = $open;
		}
		else {
			_open();
		}
	}

	var save = function () {

		var x = $("#setting-x-axis")[0];
		var y = $("#setting-y-axis")[0];

		var xSelect = x.options[x.selectedIndex].value;
		var ySelect = y.options[y.selectedIndex].value;

		g.setDirection("xDir", xSelect == "up" ? 1 : -1);
		g.setDirection("yDir", ySelect == "up" ? 1 : -1);
	}

	var close = function ($close) {

		if ($close) {
			_close = $close;
		}
		else {
			_close();
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

		open();
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
		open:open,
		close:close
	}

}]);