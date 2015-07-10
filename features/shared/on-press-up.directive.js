sharedModule.directive('onPressUp', function () {
	return function (scope, element, attrs) {
		return $(element).hammer({
			 	prevent_default: false,
			 	drag_vertical: false
			})
			 .bind("pressup", function (ev) {
			   return scope.$apply(attrs['onPressUp']);
			 });
	};
});