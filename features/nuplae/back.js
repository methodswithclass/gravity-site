nuplaeModule.directive("back", ['nuplaeService', 'states', function (nuServ, states) {


	var link = function ($scope, element, attr) {

		var game = $scope.game;

		var addCLass = function (_class) {

			element.find("i").addClass(_class)
		}

		switch(game.name) {
			
			case "Calibrate":
				addClas("padding-right");
			break;

			case "Gravity":
				addClas("padding-left");
			break;

			case "Float":
				addClas("padding-left");
			break;

			case "Enemies":
				addClas("padding-up");
			break;

			case "Balance":
				addClas("padding-up");
			break;

			case "Space":
				addClas("padding-up");
			break;
		}

		

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