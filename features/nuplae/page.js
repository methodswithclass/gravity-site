nuplaeModule.directive("page", function () {

	return {
		restrict:'E',
		scope:{
			info:'=',
			view:'@'
		},
		template:'<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

			console.log("name: " + $scope.info.name + " view: " + $scope.view);

			$scope.getContentUrl = function() {
				//console.log($scope.view);
                return 'features/nuplae/' + $scope.view;
            }

		}

	}
});