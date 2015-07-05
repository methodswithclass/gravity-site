nuplaeModule.directive("back", ['navigation', 'nuplaeService', function (nav, nuServ) {


	var link = function ($scope, element, attr) {

		// $scope.getClasses = function (info, whichClass) {

		// 	//classes in params service on data

		// 	var rect = info.page.rect;

		// 	//console.log("rotate " + rect.top + " " + rect.left);

		// 	if (rect.top == 0) {

		// 		if (rect.left == 0) {
		// 			return whichClass.right;
		// 		}
		// 		else {
		// 			return whichClass.left;
		// 		}
		// 	}
		// 	else if (rect.top == "50%") {
		// 		return whichClass.up;
		// 	}

		// 	return whichClass.left;

		// }

		var game = $scope.game;

		$("#outer" + game.name).addClass(game.padding);
		$("#icon" + game.name).addClass(game.icon);

		nuServ.buttonTouch(element, {
			name:"back",
			back_press:"black-back",
			back_save:"white-back",
			add_class:"fa-inverse"
		}, function () {
			nav.open(0, 300);
		});
	}


	return {
		scope:{
			game:'='
		},
		restrict:'E',
		templateUrl:"features/nuplae/back.html",
		link:link
	}

}]);