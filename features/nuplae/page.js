nuplaeModule.directive("page", ['navigation', function (nav) {

	return {
		restrict:'E',
		scope:{
			info:'=',
			view:'@'
		},
		template:'<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

			$scope.getContentUrl = function() {
				//console.log($scope.view);
                return 'features/nuplae/' + $scope.view;
            }

		}

	}
}]);