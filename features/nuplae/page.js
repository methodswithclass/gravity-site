nuplaeModule.directive("page", function () {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		template:'<div ng-include="getContentUrl()"></div>'
		link:function ($scope, element, attr) {


			$scope.getContentUrl = function() {

				init();

				var view =  $scope.info.page.view;

				console.log(view);

                return 'features/nuplae/' + view;
            }

            
		}

	}
});