nuplaeModule.directive("back", ['nuplaeService', 'states', 'send', function (nuServ, states, send) {


	var link = function ($scope, element, attr) {

		var game = $scope.game;

		console.log(attr.dir + " " + attr.id)

		//send.accum({name:attr.dir, id:attr.id, data:element[0]});

		var obj = {
			type:"back",
			name:"back" + game.name,
			back_press:"black-back",
			back_save:"white-back",
			add_class:"fa-inverse",
			complete:function () {
				console.log("go back");
				states.gotoPage(0);
			}
		}

		$scope.onPress = function () {

			nuServ.changeButton(element, obj);
		}

		$scope.onPressup = function () {

			nuServ.returnButton(element, obj);

			obj.complete();
		}

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
		replace:true,
		restrict:'E',
		templateUrl:"features/nuplae/views/back.html",
		link:link
	}

}]);