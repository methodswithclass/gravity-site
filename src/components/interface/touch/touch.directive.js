touchModule.directive("touch", function () {

	return {
		scope:{
			dir:"@"
		},
        link: function ($scope, element, attr) {

            var start = 0;

            var setPosition = function (diff) {

                //console.log("start", start, "diff", diff);

                var value = start + diff;
                var begin = 0;
                var end = $scope.dir == "y" ? $(element).height() - $(element).parent().height() : $(element).width() - $(element).parent().width();

                if (value > begin) {
                    value = begin;
                }

                if (value < -1*end) {

                    value = -1 * end;
                }

                var prop = $scope.dir == "y" ? "top" : "left";

                element.css({ prop: value });
            }

            var mc;

            setTimeout(function () {
                mc = new Hammer.Manager(element[0]);
                var Press = new Hammer.Press();
                var Pan = new Hammer.Pan();
                mc.add(Press);
                mc.add(Pan);
                mc.get("press").set({ time: 10 });
                mc.get('pan').set({ direction: $scope.dir == "y" ? Hammer.DIRECTION_VERTICAL : Hammer.DIRECTION_HORIZONTAL });
                mc.on("press", function (e) {

                    start = $scope.dir == "y" ? $(element).position().top : $(element).position().left;
                })
                mc.on('pan', function (e) {
                    value = $scope.dir == "y" ? e.deltaY : e.deltaX;

                    //console.log("dir", $scope.dir, "delta", value);

                    setPosition(value);
                });

            }, 200);


			//var dom = element[0];
			//var touch = false;
			//var velocity = false;
			//var scroll = false;
			//var duration = 5;
			//var initial = {x:0, y:0};
			//var pos = {curr:{x:0, y:0}, last:{x:0, y:0}};
			//var speed = {curr:{x:0, y:0}, last:{x:0, y:0}};

			//var point = {x:0, y:0};

			//var min;
			//var max;			

			//setTimeout(function () {

			//	min = {x:0, y:0};
			//	max = {
			//		x:-($scope.width ? $scope.width : $(element).width()), 
			//		y:-($scope.height ? $scope.height : $(element).height())
			//	};

			//}, 800);

			

			//var limits = function (dim) {

			//	//console.log("min x", min.x, "min y", min.y);
				
				

			//	if (dim.x >= min.x) {
			//		//console.log("fixed x");
			//		dim.x = min.x;
			//	}
			//	else if (dim.x <= max.x) dim.x = max.x;

			//	if (dim.y >= min.y) dim.y = min.y;
			//	else if (dim.y <= max.y) dim.y = max.y;

			//	//console.log("dim x", dim.x, "dim y", dim.y);

			//	return {x:dim.x, y:dim.y};
			//}

			//var constrain = function (dim) {

			//	if ($scope.dir == "x") {
			//		dim.y = 0;
			//	}
			//	else if ($scope.dir == "y") {
			//		dim.x = 0;
			//	}

			//	return dim;
			//}

			//var friction = function (dim) {

			//	dim.x *= 0.99;
			//	dim.y *= 0.99;

			//	if (Math.abs(dim.x) < 0.001) dim.x = 0;
			//	if (Math.abs(dim.y) < 0.001) dim.y = 0;

			//	if (dim.x == 0 && dim.y == 0) {
			//		velocity = false;
			//		scroll = false;
			//	}

			//	return dim;
			//}

			//var down = function (e) {

			//	console.log("touch down");
				
			//	scroll = true;
			//	touch = true;
			//	initial = {x:e.pageX, y:e.pageY};
			//	pos.last = {x:initial.x, y:initial.y};
			//}

			//var move = function (e) {

			//	if (touch) {

			//		pos.curr = {x:e.pageX - initial.x, y:e.pageY - initial.y};

			//		if (pos.curr.x >= min.x) pos.curr.x = min.x;
			//		else if (pos.curr.x <= max.x) pos.curr.x = max.x;

			//		if (pos.curr.y >= min.y) pos.curr.y = min.y;
			//		else if (pos.curr.y <= max.y) pos.curr.y = max.y;


			//		if ($scope.dir == "x") {
			//			pos.curr.y = 0;
			//		}
			//		else if ($scope.dir == "y") {
			//			pos.curr.x = 0;
			//		}

			//		pos.last = pos.curr;

			//	}
				
			//}

			//var up = function (e) {

			//	console.log("touch up");

			//	speed.curr = {
			//		x:(pos.curr.x - pos.last.x)/duration,
			//		y:(pos.curr.y - pos.last.y)/duration
			//	}

			//	//velocity = true;
			//	touch = false;
			//	scroll = false;
			//}

			//var scrollUpdate = setInterval(function () {

			//	if (scroll) {
			//		console.log("scroll");
			//		$(element).css({left:pos.curr.x + "px", top:pos.curr.y + "px"});
			//	}

			//}, duration);

			//var velocityUpdate = setInterval(function () {

			//	if (velocity) {
			//		pos.curr.x += speed.curr.x;
			//		pos.curr.y += speed.curr.y;

			//		console.log("pos x", pos.curr.x, "pos y", pos.curr.y);
			//		console.log("speed x", speed.curr.x, "speed y", speed.curr.y);

			//		speed.curr = friction(speed.curr);

			//	}

			//}, duration);

			//dom.addEventListener("mousedown", down);
			//dom.addEventListener("touchstart", down);

			//dom.addEventListener("mousemove", move);
			//dom.addEventListener("touchmove", move);

			//dom.addEventListener("mouseup", up);
			//dom.addEventListener("touchend", up);

			
		}
	}

});