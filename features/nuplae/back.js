nuplaeModule.directive("back", ['navigation', 'nuplaeService', function (nav, nuServ) {

	return {
		scope:{
			game:'='
		},
		restrict:'E',
		replace:true,
		template:"<div ng-class='getClasses(game)' ng-style='getimgloc(game)'><i class='fa fa-chevron-left fa-5x'></i></div>",
		link:function ($scope, element, attr) {

			$scope.getimgloc = function (info) {

				var style = {top:0, left:"10px"};
				var rect = info.page.rect;

				//console.log("location " + rect.top + " " + rect.left);

				if (rect.left == 0) {
					style = {top:0, right:"10px"};
				}

				return style;
			}

			$scope.getClasses = function (info) {

				var classes = "absolute padding-10 white-back rounded10";
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
				back_press:"black-back",
				back_save:"white-back",
				add_class:"fa-inverse"
			}, function () {
				nav.open(0, 300);
			});
		}
	}

}]);