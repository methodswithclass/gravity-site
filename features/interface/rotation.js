uiModule.directive("rotation", ['global', '$window', function (g, $window) {

	return function ($scope, element, attr) {

		var elem = "<div class='absolute width height black-back font-70 white'>" + 
						"<div class='absolute width60 center'>" + 
							"turn off your screen rotation to play this game"
						"</div>" + 
					"</div>";


		var resize = function () {

			if (!g.isPortrait() && !$(elem)[0]) {
				$(element).append(elem);
			}
			else {
				$(elem).remove();
			}
		}

		angular.element($window).bind('resize', function () {
			resize();
		});


	}

});