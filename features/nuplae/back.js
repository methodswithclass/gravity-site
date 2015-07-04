nuplaeModule.directive("back", ['navigation', 'nuplaeService', function (nav, nuServ) {

	return {
		restrict:'E',
		replace:true,
		template:"<div class='absolute bottom-100 width80 height-100 gray-back hcenter pointer white'><div class='absolute center text-center font-40'>Back</div></div>",
		link:function ($scope, element, attr) {

			nuServ.buttonTouch(element, {
				name:info.name,
				page:info,
				back_press:"orange-back",
				back_save:"gray_back",
				add_class:"lowered",
				text_press:"white",
				text_save:"white"
			}, function () {
				nav.open(0, 300);
			});
		}
	}

}]);