sharedModule.directive('onPressUp', function () {
	return function (scope, element, attrs) {
		var mc = $(element).hammer({
			 	prevent_default: false,
			 	drag_vertical: false
			})
			 .bind("pressup", function (ev) {
			   return scope.$apply(attrs['onPressUp']);
			 });

		$(element).data("hammer").get("press").set({time:1, thresshold:10});

		return mc;
	};
});