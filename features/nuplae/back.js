nuplaeModule.directive("back", ['nuplaeService', 'states', 'send', function (nuServ, states, send) {


	var link = function ($scope, element, attr) {

		var game = $scope.game;

		console.log(attr.dir + " " + attr.id)

		send.accum({name:attr.dir, id:attr.id, data:element[0]})

		var addClass = function (_class) {

			element.find("i").addClass(_class)
		}

		switch(game.name) {

			case "Calibrate":
				addClass("padding-right");
			break;

			case "Gravity":
				addClass("padding-left");
			break;

			case "Float":
				addClass("padding-left");
			break;

			case "Enemies":
				addClass("padding-up");
			break;

			case "Balance":
				addClass("padding-up");
			break;

			case "Space":
				addClass("padding-up");
			break;
		}

		
	}


	return {
		scope:{
			game:'='
		},
		restrict:'E',
		templateUrl:"features/nuplae/views/back.html",
		link:link
	}

}]);