sharedModule.directive('onPress', function () {
	return function (scope, element, attrs) {
		return $(element).hammer({
			 	prevent_default: false,
			 	drag_vertical: false,
			 	time:1,
			 	threshold:10
			})
			 .bind("press", function (ev) {
			   return scope.$apply(attrs['onPress']);
			 });
	};
});