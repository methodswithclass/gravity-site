nuplaeModule.directive("page", function () {

	return {
		restrict:'E',
		scope:{
			info:'=',
			view:'@'
		},
		template:'<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

			$scope.getContentUrl = function() {
				console.log(view);
                return 'features/nuplae/' + view;
            }

		}

	}
});