nuplaeModule.directive("back", ['navigation', 'nuplaeService', function (nav, nuServ) {

	return {
		restrict:'E',
		replace:true,
		template:"<img src='/img/back.png' class='absolute width-50 height-auto pointer gray-back ng-class=getRotation(info)' ng-style='{getimgloc(info)}'/>",
		link:function ($scope, element, attr) {

			$scope.getimgloc = function (info) {

				var left;
				var rect = info.rect;

				if (rect.left == 0) {
					left = 90;
				}
				else if (rect.left == "50%" || rect.left == "75%") {
					left = 10;
				}

				return {top:0, left:left + "px"};
			}

			$scope.getRotation = function (info) {

				var rotate = "";
				var rect = info.rect;

				if (rect.top == 0 && (rect.left == "50%" || rect.left == "75%")) {
					rotate = "flip-h";
				}
				else if (rect.top == "50%") {
					rotate = "rotate-counter-90";
				}

				return rotate;

			}

			nuServ.buttonTouch(element, {
				name:"back",
				back_press:"orange-back",
				back_save:"gray_back",
				add_class:"lowered"
			}, function () {
				nav.open(0, 300);
			});
		}
	}

}]);