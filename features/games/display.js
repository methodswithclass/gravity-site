gamesModule.directive("display", ['send', function (send) {

	return {

		scope:false,
		restrict:"E",
		replace:true,
		templateUrl:"features/games/display.html",
		link:function ($scope, element, attr) {

			var name = $scope.info.name;

			setTimeout(function() {

				var time = $("#time" + name);
				var points = $("#points" + name);

				var display = {time:time, points:points};

				send.accum({name:"display", id:name, data:display});

			}, 300);

		}
	}

}]);