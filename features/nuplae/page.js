nuplaeModule.directive("page", function () {

	return {
		restrict:'E',
		scope:{
			info:'=',
			view:'@'
		},
		template:'<div ng-include="getContentUrl()"></div>'
		link:function ($scope, element, attr) {

			$scope.getContentUrl = function() {
                return 'features/nuplae/' + view;
            }

   //          $scope.parseView = function (page) {

			// 	var name = page.name;

			// 	var view = "home.html";

			// 	var test = name == "Home" ? true : false;

			// 	if (test) {

			// 		view = "home.html";

			// 		console.log(view);

			// 		return view;
			// 	}
			// 	else {
			// 		return name == "Calibrate" ? true : false;
			// 	}

			// 	if (test) {

			// 		view = "calibrate.html";

			// 		console.log(view);

			// 		return view
			// 	}
			// 	else {

			// 		var view = name == "Gravity" || name == "Float" ? "setup.html" : "game.html";

			// 		console.log(view);

			// 		return view;
			// 	}

			// 	console.log("no return " + view);

			// 	return view;
			// }


		}

	}
});