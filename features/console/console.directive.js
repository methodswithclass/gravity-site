console.module.directive("console", function () {

	var link = function ($scope, element, attr) {

		var vis = attr.vis;

		if (vis == "show") {
			element.show();
		}
		else {
			element.hide();
		}

	}

	return {
		template:"<div class='console' id='consoleInner'></div><div class='console' id='consoleContainer'></div>",
		link:link
	}
});