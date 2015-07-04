nuplaeModule.directive("option", ['nuplaeService', 'navigation', function (nuServ, nav) {

	return {
		restrict:'E',
		replace:true,
		scope:{
			info:'='
		},
		template:"<div class='relative width90 height-150 margin-v-50 center border pointer white {{info.menu}}'>" +
					"<div class='absolute center font-50 text-center'>{{info.name}}</div>" + 
				 "</div>",
		link:function ($scope, element, attr) {

			var info = $scope.info;

			nuServ.buttonTouch(element, {
				page:info,
				back_press:"white_back",
				back_save:info.menu,
				text_press:"black",
				text_save:"white"
			}, function () {
				nav.open(info, 500);
			});

		}
	}

}]);