nuplaeModule.directive("back", ['navigation', 'nuplaeService', function (nav, nuServ) {

	return {
		scope:{
			info:'='
		},
		restrict:'E',
		replace:true,
		template:"<div class='absolute bottom-100 width-100 height-50 gray-back hcenter pointer white'><div class='absolute center text-center font-40'>Back</div></div>",
		link:function ($scope, element, attr) {

			var info = $scope.info;

			nuServ.buttonTouch(element, {
				name:"back",
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