validateModule.directive("valid", ['utility.service', function (util) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		template:"<div ng-include='getContentUrl()'></div>",
		link:function ($scope, element, attr) {

			$scope.getContentUrl = function() {

				if (util.isValid()) {
					return "assets/views/validity-valid.view.html"
				}
				else {
					return "assets/views/validity-invalid.view.html"
				}
            }
			
		}
	}

}]);