uiModule.directive("back", ['buttonService', 'send', 'manager', function (buttons, send, manager) {


	var link = function ($scope, element, attr) {

		var game = $scope.info;

		send.accum({name:attr.dir, id:attr.id, data:element[0]});

		// $scope.onPress = function () {

		// 	console.log("on press");

		// 	buttons.callChange({name:attr.id, others:false, isId:true});
		// }

		$scope.onPressup = function () {

			console.log("on pressup");

			//buttons.callReturn({name:attr.id, others:false, isId:true});
		
			buttons.buttonAction({name:"back.Home"});

			manager.stopInstance(game.name);
		}

		var addClass = function (_class) {

			element.find("i").addClass(_class);
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
		scope:false,
		replace:true,
		restrict:'E',
		templateUrl:"features/interface/views/back.html",
		link:link
	}

}]);