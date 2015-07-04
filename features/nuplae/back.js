nuplaeModule.directive("back", ['navigation', 'nuplaeService', function (nav, nuServ) {

	return {
		scope:{
			game:'='
		},
		restrict:'E',
		replace:true,
		template:"<div class='absolute padding-10 white-back rounded10' ng-style='getimgloc(game)'><i ng-class='getClasses(game)'></i></div>",
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


				var classes = 'fa fa-5x';
				var rect = info.page.rect;

				//console.log("rotate " + rect.top + " " + rect.left);

				if (rect.top == 0) {

					if (rect.left == 0) {
						classes += ' fa-chevron-right';
					}
					else {
						classes += ' fa-chevron-left'
					}
				}
				else if (rect.top == "50%") {
					classes += ' fa-chevron-up';
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