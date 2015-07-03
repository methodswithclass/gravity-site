nuplaeModule.directive("back", ['navigation', function (nav) {

	return {
		restrict:'E',
		replace:true,
		template:"<div class='absolute bottom-100 width40 height-50 gray-back hcenter pointer' on-tap='tapped()'><div class='absolute center text-center font-30 white'>Back</div></div>",
		link:function ($scope, element, attr) {

			$scope.tapped = function () {

				nav.open(0, 500);
			}
		}
	}

}]);