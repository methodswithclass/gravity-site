sharedModule.directive('onPress', function () {
	return function (scope, element, attrs) {
		var mc = $(element).hammer({
			 	prevent_default: false,
			 	drag_vertical: false
			}).bind("press", function (ev) {
			   return scope.$apply(attrs['onPress']);
			 });
			
		$(element).data("hammer").get("press").set({time:1, thresshold:10});

		return mc;
			 

			 
	};
});