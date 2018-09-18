touchModule.directive("touch", function () {

	return {
		scope:{
			dir:"@",
			scroll:"@"
		},
        link: function ($scope, element, attr) {

            var start = 0;

            var $scroll = $scope.scroll ? ("#" + $scope.scroll) : element;

            var setPosition = function (diff) {

                //console.log("start", start, "diff", diff);

                var value = start + diff;
                var begin = 0;
                var end = ($scope.dir == "y" ? ($(element).height() - $($scroll).height()) : ($(element).width() - $($scroll).width()));

                if (value < begin) {
                    value = begin;
                }

                if (value > end) {

                    value = end;
                }


                console.log("value", value);

                var prop = $scope.dir == "y" ? "top" : "left";


               	if ($scope.scroll) {

               		$($scroll).scrollTo(value, {axis:$scope.dir == "y" ? $scope.dir : "x"});
            	}
            	else {
            		$(element).css({prop:value});
            	}
                

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

                	if ($scope.scroll) {
                		start = $scope.dir == "y" ? $($scroll).scrollTop() : $($scroll).scrollLeft();
                	}
                	else {
                    	start = $scope.dir == "y" ? $(element).position().top : $(element).position().left;
                	}
                })
                mc.on('pan', function (e) {
                    var $value = (-1)*($scope.dir == "y" ? e.deltaY : e.deltaX);

                    //console.log("dir", $scope.dir, "delta", value);

                    setPosition($value);
                });

            }, 200);

			
		}
	}

});