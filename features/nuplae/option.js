nuplaeModule.directive("option", ['navigation', function (nav) {

	return {
		restrict:'E',
		replace:true,
		scope:{
			info:'='
		},
		template:"<div class='relative width90 height-200 margin-v-50 center border pointer {{info.menu}}' on-tap='tapped(info)'>" +
					"<div class='absolute center font-40 text-center white'>{{info.name}}</div>" + 
				 "</div>",
		link:function ($scope, element, attr) {

			$scope.tapped = function (info) {

				//console.log("tapped " + info.name);

				nav.open(info, 500);
			}

		}
	}

}]);