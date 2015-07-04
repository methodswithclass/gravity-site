nuplaeModule.directive("back", ['navigation', 'nuplaeService', function (nav, nuServ) {

	return {
		scope:{
			game:'='
		},
		restrict:'E',
		replace:true,
		template:"<div class='absolute margin-10 width-50 height-50 pointer white-back ng-class=getRotation(game)' ng-style='getimgloc(game)'><img src='/img/back.png' class='absolute width height corner'/></div>",
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

			$scope.getRotation = function (info) {

				var classes = "";
				var rect = info.page.rect;

				//console.log("rotate " + rect.top + " " + rect.left);

				if (rect.top == 0 && rect.left == 0) {
					classes += ' flip-h';
				}
				else if (rect.top == "50%") {
					classes += ' rotate-counter-90';
				}

				return classes;

			}

			nuServ.buttonTouch(element, {
				name:"back",
				back_press:"orange-back",
				back_save:"white-back",
				add_class:"lowered"
			}, function () {
				nav.open(0, 300);
			});
		}
	}

}]);