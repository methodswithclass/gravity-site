settingsModule.directive("axesToggle", function () {



	return {
		replace:false,
		scope:{
			dir:"@",
			setDir:"="
		},
		templateUrl:"../../assets/views/settings/axes.toggle.html",
		link:function ($scope, element, attr) {

			$scope.setDirection = function (value) {

				console.log("set direction", $scope.dir, value);

				// $scope.setDir($scope.dir, value);
			}
		}
	}
})