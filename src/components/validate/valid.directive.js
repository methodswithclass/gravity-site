validateModule.directive("valid", ['utility.service', function (util) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"assets/views/valid.view.html",
		link:function ($scope, element, attr) {
			
		}
	}

}]);