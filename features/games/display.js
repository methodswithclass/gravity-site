gamesModule.directive("display", ['send', function (send) {

	return {

		scope:false,
		restrict:"E",
		replace:true,
		templateUrl:"views/sub-page/display.html",
		link:function ($scope, element, attr) {

			var page = $scope.page;

			setTimeout(function() {

				var time = $("#time" + page.id);
				var points = $("#points" + page.id);
				var stats = $("#stats" + page.id);

				var display = {time:time, points:points, stats:stats};

				//console.log("get display", page.id, time[0], points[0], stats[0])

				send.retrieve.accum({name:"display", id:page.id, data:display});

			}, 2000);

		}
	}

}]);