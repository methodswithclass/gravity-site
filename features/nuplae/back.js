nuplaeModule.directive("back", ['navigation', 'nuplaeService', function (nav, nuServ) {

	return {
		scope:{
			game:'='
		},
		restrict:'E',
		replace:true,
		template:"<i ng-class='getClasses(game)' ng-style='getimgloc(game)'></i>",
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

				var classes = "fa fa-chevron-left fa-4x";
				var rect = info.page.rect;

				//console.log("rotate " + rect.top + " " + rect.left);

				if (rect.top == 0 && rect.left == 0) {
					classes += ' fa-flip-horizontal';
				}
				else if (rect.top == "50%") {
					classes += ' fa-flip-horizontal fa-rotate-90';
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