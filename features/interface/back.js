uiModule.directive("back", ['states', 'send', 'manager', function (states, send, manager) {


	var link = function ($scope, element, attr) {

		var game = $scope.info;

		//send.accum({name:attr.dir, id:attr.id, data:element[0]});

		$scope.onPressup = function () {

			console.log("return home");

			//buttons.callReturn({name:attr.id, others:false, isId:true});
		
			//buttons.buttonAction({name:"back.Home"});

			states.go("page.home");

			//manager.stopInstance(game.name, true);
			//manager.leaveInstance(game.name);
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
		templateUrl:"features/views/back.html",
		link:link
	}

}]);