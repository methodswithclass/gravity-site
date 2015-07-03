nuplaeModule.directive("option", function () {

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

				var body = ("#body");

				body.animate({top:info.rect.top, left:info.rect.left}, 300);
			}

		}
	}

});