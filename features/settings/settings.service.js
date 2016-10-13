settingsModule.factory("settings.service", ['utility', function (g) {


	var save = function () {

		var x = $("#setting-x-axis")[0];
		var y = $("#setting-y-axis")[0];

		var xSelect = x.options[x.selectedIndex].value;
		var ySelect = y.options[y.selectedIndex].value;

		g.setDirection("xDir", xSelect == "up" ? 1 : -1);
		g.setDirection("yDir", ySelect == "up" ? 1 : -1);
	}

	return {
		save:save
	}

}]);