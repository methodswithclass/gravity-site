nuplaeModule.directive("back", ['navigation', function (nav) {

	return {
		scope:{
			info:'='
		},
		restrict:'E',
		replace:true,
		template:"<div class='absolute bottom-100 width40 height-50 gray-back hcenter pointer'><div class='absolute center text-center font-30 white'>Back</div></div>",
		link:function ($scope, element, attr) {

			var info = $scope.info;

			nuServ.buttonTouch(element, {
				page:info,
				back_press:"pink_back",
				back_save:"gray_back",
				add_class:"lowered",
				text_press:"black",
				text_save:"white"
			}, function () {
				nav.open(0, 500);
			});
		}
	}

}]);