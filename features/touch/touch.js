touchModule.directive("touch", function () {

	return {
		scope:{
			dir:"@",
			width:"@",
			height:"@"
		},
		link:function ($scope, element, attr) {

			var dom = element[0];

			//console.log("touch", dom);

			var isDown = false;
			var initial = {x:0, y:0};
			var pos;
			var diff = {x:0, y:0};

			var mouseDown = function (e) {

				console.log("touch down");
						
				if (!isDown) {

					isDown = true;
					initial = {x:e.pageX - diff.x, y:e.pageY - diff.y};
				}
			}

			var mouseMove = function (e) {

				if (isDown) {

					pos = {x:e.pageX, y:e.pageY};

					if ($scope.dir == "x") {
						diff = {x:pos.x - initial.x, y:0};
					}
					else if ($scope.dir == "y") {
						diff = {x:0, y:pos.y - initial.y};
					}
					else {
						diff = {x:pos.x - initial.x, y:pos.y - initial.y};
					}

					//console.log("left", left);
					console.log("diff y", diff.y, "diff x", diff.x);

					if (diff.x < -1*$scope.width) diff.x = -1*$scope.width;
					else if (diff.x > 0) diff.x = 0;

					if (diff.y < -1*$scope.height) diff.y = -1*$scope.height;
					else if (diff.y > 0) diff.y = 0;

					console.log("after width", $scope.width);

					$(element).css({left:diff.x, top:diff.y});

				}
				
			}

			var mouseUp = function (e) {

				console.log("touch up");

				isDown = false;
			}

			dom.addEventListener("mousedown", mouseDown);
			dom.addEventListener("mouseup", mouseUp);
			//dom.addEventListener("mouseout", mouseUp);
			dom.addEventListener("touchstart", mouseDown);
			dom.addEventListener("touchend", mouseUp);
			dom.addEventListener("mousemove", mouseMove);
			dom.addEventListener("touchmove", mouseMove);
		}
	}

});