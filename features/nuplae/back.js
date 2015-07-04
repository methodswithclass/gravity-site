nuplaeModule.directive("back", ['navigation', 'nuplaeService', function (nav, nuServ) {

	return {
		scope:{
			game:'='
		},
		restrict:'E',
		replace:true,
		template:"<div ng-class='getClasses(game)' ng-style='getimgloc(game)'><img src='/img/back.png' class='absolute width height corner'/></div>",
		link:function ($scope, element, attr) {

			$scope.getimgloc = function (info) {

				var style = {top:0, left:0};
				var rect = info.page.rect;

				//console.log("location " + rect.top + " " + rect.left);

				if (rect.left == 0) {
					style = {top:0, right:0};
				}

				return style;
			}

			$scope.getClasses = function (info) {

				var classes = "absolute margin-10 width-100 height-100 pointer gray-back rounded20";
				var rect = info.page.rect;

				//console.log("rotate " + rect.top + " " + rect.left);

				if (rect.top == 0 && rect.left == 0) {
					classes += ' flip-h';
				}
				else if (rect.top == "50%") {
					classes += ' rotate-clock-90';
				}

				return classes;

			}

			nuServ.buttonTouch(element, {
				name:"back",
				back_press:"orange-back",
				back_save:"gray-back",
				add_class:"lowered"
			}, function () {
				nav.open(0, 300);
			});
		}
	}

}]);