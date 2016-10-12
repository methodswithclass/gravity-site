uiModule.directive("rotation", ['global', '$window', function (g, $window) {

	return {
		scope:false,
		link:function ($scope, element, attr) {

			var id = $scope.info.id;

			var elem = "<div id='screenwarn" + id + "' class='absolute width height z-100'>" +
							"<div class='absolute width height black-back opacity90'></div>" + 
							"<div class='absolute width60 center font-40 white'>" + 
								"lock your screen in portrait mode <br> in your phone's settings <br> to play this game" +
							"</div>" + 
						"</div>";

			var added = false;

			var resize = function () {

				if (g.isMobile() && !g.isPortrait() && !added) {
					added = true;
					$(element).append(elem);
				}
				else if (g.isPortrait()) {
					added = false;
					$("#screenwarn" + id).remove();
				}
			}

			resize();

			angular.element($window).bind('resize', function () {
				resize();
			});


		}

	}

}]);