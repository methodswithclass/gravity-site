nuplaeModule.directive("page", function () {

	return {
		restrict:'E',
		replace:true,
		scope:{
			info:'='
		},
		template:'<div ng-include="getContentUrl()"></div>'
		link:function ($scope, element, attr) {

			scope.getContentUrl = function() {
                return 'features/nuplae/' + attr.view;
            }
		}

	}
});