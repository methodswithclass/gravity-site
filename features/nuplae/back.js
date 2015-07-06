nuplaeModule.directive("back", ['nuplaeService', 'states', function (nuServ, states) {


	var link = function ($scope, element, attr) {

		var game = $scope.game;

		element.find("#outer" + game.name).addClass(game.padding);
		element.find("#icon" + game.name).addClass(game.icon);

		nuServ.buttonTouch(element, {
			name:"back",
			back_press:"black-back",
			back_save:"white-back",
			add_class:"fa-inverse"
		}, function () {
			states.gotoPage(0);
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