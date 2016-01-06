touchModule.directive("touch", function () {

	return {
		scope:{
			dir:"@"
		},
		link:function ($scope, element, attr) {

			var dom = element[0];

			//console.log("touch", dom);

			var isDown = false;
			var initial = {x:0, y:0};

			var top = $(element).position().top;
			var left = $(element).position().left;

			var mouseDown = function (e) {

				console.log("touch down");
						
				if (!isDown) {

					isDown = true;
					initial = {x:e.pageX - left, y:e.pageY - top};
				}
			}

			var mouseMove = function (e) {

				if (isDown) {

					var pos = {x:e.pageX, y:e.pageY};
						
					var diff;

					if ($scope.dir == "x") {
						diff = {x:pos.x - initial.x, y:0};
					}
					else if ($scope.dir == "y") {
						diff = {x:0, y:pos.y - initial.y};
					}
					else {
						diff = {x:pos.x - initial.x, y:pos.y - initial.y};
					}

					console.log("diff y", diff.y, "diff x", diff.x);

					if (diff.x < -1*$(element).width()) diff.x = -1*$(element).width();
					else if (diff.x > 0) diff.x = 0;

					if (diff.y < -1*$(element).height()) diff.y = -1*$(element).height();
					else if (diff.y > 0) diff.y = 0;

					

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