nuplaeModule.directive("option", ['nuplaeService', 'navigation', function (nuServ, nav) {

	return {
		restrict:'E',
		replace:true,
		scope:{
			info:'='
		},
		template:"<div class='relative width90 height-150 margin-v-50 center border pointer {{info.menu}}'>" +
					"<div class='absolute center font-50 text-center white' id={{'title' + info.name}}>{{info.name}}</div>" + 
				 "</div>",
		link:function ($scope, element, attr) {

			var info = $scope.info;

			nuServ.buttonTouch(element, info, function () {

				nav.open(info, 500);
			});

		}
	}

}]);