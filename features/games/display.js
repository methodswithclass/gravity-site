gamesModule.directive("display", ['send', function (send) {

	return {

		scope:false,
		restrict:"E",
		replace:true,
		templateUrl:"features/games/display.html",
		link:function ($scope, element, attr) {

			var page = $scope.page;

			setTimeout(function() {

				var time = $("#time" + page.id);
				var points = $("#points" + page.id);
				var stats = $("#stats" + page.id);

				var display = {time:time, points:points, stats:stats};

				send.retrieve.accum({name:"display", id:page.id, data:display});

			}, 300);

		}
	}

}]);