validateModule.directive("valid", ['utility', function (util) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		template:"<div ng-include='getContentUrl()'></div>",
		link:function ($scope, element, attr) {

			$scope.getContentUrl = function() {

				if (util.isValid()) {
					return "views/modal.valid.html"
				}
				else {
					return "views/modal.invalid.html"
				}
            }
			
		}
	}

}]);