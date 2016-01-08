uiModule.directive("rotation", ['global', '$window', function (g, $window) {

	return function ($scope, element, attr) {

		var elem = "<div id='screenwarn' class='absolute width height z-100'>" +
						"<div class='absolute width height black-back opacity90'></div>" + 
						"<div class='absolute width60 center font-70 white'>" + 
							"lock your screen in portrait mode to play this game" +
						"</div>" + 
					"</div>";

		var added = false;

		var resize = function () {

			if (!g.isPortrait() && !added) {
				added = true;
				$(element).append(elem);
			}
			else if (g.isPortrait()) {
				added = false;
				$("#screenwarn").remove();
			}
		}

		resize();

		angular.element($window).bind('resize', function () {
			resize();
		});


	}

}]);