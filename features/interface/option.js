uiModule.directive("option", ['states', 'send', function (states, send) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"views/sub-page/option.html",
		link:function ($scope, element, attr) {

			var self = this;

			//send.accum({name:attr.dir, id:attr.id, data:element[0]});

			$scope.onPressup = function () {

				states.go("page." + $scope.page.id);
			}

		}
	}

}]);