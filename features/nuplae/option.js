nuplaeModule.directive("option", function (nav) {

	return {
		restrict:'E',
		replace:true,
		scope:{
			info:'='
		},
		template:"<div class='relative width80 height-100 margin-v-20 center border pointer {{info.menu}}' on-tap='tapped(info)'>" +
					"<div class='absolute center font-30 text-center white'>{{info.name}}</div>" + 
				 "</div>",
		link:function ($scope, element, attr) {

			$scope.tapped = function (info) {

				console.log("tapped " + info.name);

				nav.open(info, 300);
			}

		}
	}

});