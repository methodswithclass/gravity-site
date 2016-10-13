settingsModule.factory("settings.service", ['utility', function (g) {

	var _open = function () {};
	var _close = function () {};

	var scope = function (_scope) {

		$scope = _scope;
	}


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

	return {
		scope:scope,
		open:open,
		close:close
	}

}]);