nuplaeModule.directive("option", ['nuplaeService', 'navigation', function (nuServ, nav) {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		template:"<div class='relative width90 height-150 margin-v-50 center border pointer {{info.menu}}'>" +
					"<div class='absolute center font-50 text-center white'>{{info.name}}</div>" + 
				 "</div>",
		link:function ($scope, element, attr) {

			var children = element[0].children;

			for (i in children) {
				console.log($(children[i]).attr('class'));
			}

			var info = $scope.info;

			nuServ.buttonTouch(element, info, function () {

				nav.open(info, 500);
			});

		}
	}

}]);