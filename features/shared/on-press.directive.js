sharedModule.directive('onPress', function () {
	return function (scope, element, attrs) {
		return $(element).hammer({
			 	prevent_default: false,
			 	drag_vertical: false
			})
			 .bind("press", function (ev) {
			   return scope.$apply(attrs['onPress']);
			 });
	};
});