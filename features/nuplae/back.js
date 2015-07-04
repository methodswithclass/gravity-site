nuplaeModule.directive("back", ['navigation', 'nuplaeService', function (nav, nuServ) {



	return {
		scope:{
			game:'='
		},
		restrict:'E',
		replace:true,
		template:"<div ng-class='getClass(game, class1)' ng-style='getimgloc(game)'><i ng-class='getClasses(game, class2)'></i></div>",
		link:function ($scope, element, attr) {

			$scope.class1 = {
				left:'absolute white-back rounded10 border padding-left',
				right:'absolute white-back rounded10 border padding-right',
				up:'absolute white-back rounded10 border padding-up'
			}

			$scope.class2 = {
				left:'fa fa-5x border fa-chevron-left',
				right:'fa fa-5x border fa-chevron-right',
				up:'fa fa-5x border fa-chevron-up'
			}

			$scope.getimgloc = function (info) {

				var style = {top:"10px", left:"10px"};
				var rect = info.page.rect;

				//console.log("location " + rect.top + " " + rect.left);

				if (rect.left == 0) {
					style = {top:"10px", right:"10px"};
				}

				return style;
			}

			$scope.getClasses = function (info, whichClass) {


				var rect = info.page.rect;

				//console.log("rotate " + rect.top + " " + rect.left);

				if (rect.top == 0) {

					if (rect.left == 0) {
						return whichClass.left;
					}
					else {
						return whichClass.right;
					}
				}
				else if (rect.top == "50%") {
					return whichClass.up;
				}

				return whichClass.left;

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