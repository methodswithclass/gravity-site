validateModule.directive("valid", ['utility.service', function (util) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		template:"<div ng-include='getContentUrl()'></div>",
		link:function ($scope, element, attr) {

			$scope.getContentUrl = function() {

				if (util.isValid()) {
					return "views/sub-page/validity.valid.html"
				}
				else {
					return "views/sub-page/validity.invalid.html"
				}
            }
			
		}
	}

}]);