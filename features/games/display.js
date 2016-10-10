gamesModule.directive("display", ['send', function (send) {

	return {

		scope:false,
		restrict:"E",
		replace:true,
		templateUrl:"features/games/display.html",
		link:function ($scope, element, attr) {

			var id = $scope.info.id;

			setTimeout(function() {

				var time = $("#time" + id);
				var points = $("#points" + id);
				var stats = $("#stats" + id);

				var display = {time:time, points:points, stats:stats};

				send.retrieve.accum({name:"display", id:id, data:display});

			}, 300);

		}
	}

}]);