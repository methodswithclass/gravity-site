interfaceModule.directive("slider", ["settings.service", function (settings) {

    return {
        scope:false,
        replace:true,
        restrict:'E',
        templateUrl:"/assets/views/slider.view.html",
        link:function ($scope, element, attr) {

            var down = false;
            var start;
            var current;

            var getSlide = function () {

                return $("#slide");
            }

            var getThumb = function () {

                return $("#slider-thumb");
            }

            var getThumbPosition = function () {

                // return getSlide().offset().top + getSlide().height() - getThumb().offset().top - getThumb().height()/2;
                return getThumb().offset().top - getSlide().offset().top - getSlide().height();
            }

            var setThumbValue = function (val) {

                console.log("set value", val);

                var top = (val > 1 ? val/100*getSlide().height() : val/getSlide().height()) - getSlide().offset().top;
                var half = getThumb().height()/2;

                return top + half;
            }

            var setThumbPosition = function (value) {

                console.log("set thumb", value);
                getThumb().css({bottom:setThumbValue(value) + "px"});
            }

            var resolved = function () {

                var topCheck = getThumb().offset().top + getThumb().height()/2 >= getSlide().offset().top;
                var bottomCheck = getThumb().offset().top + getThumb().height()/2 <= getSlide().offset().top + getSlide().height();

                return !topCheck ? 1 : (topCheck && bottomCheck ? 0 : (topCheck && !bottomCheck ? -1 : 0));
            }

            // var slideBottom = getSlide().offset().top + getSlide().height();

            // getThumb().draggable({ axis: "y" });


            setThumbPosition($scope.tempAmount);



            /////////////////////////////////////
            // drag events //////////////////////
            /////////////////////////////////////


            var mousedown = function (e) {

                e.preventDefault();

                startEvent(e);
            }

            var touchstart = function (e) {


                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                //CODE GOES HERE
                console.log(touch.pageY+' '+touch.pageX);

                startEvent(touch);

            }

            var startEvent = function (event) {

                console.log("down");

                down = true;
                start = event.pageY;
            }

            var mousemove = function (e) {

                e.preventDefault();

                moveEvent(e);
            }

            var touchmove = function (e) {

                e.preventDefault();
                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

                moveEvent(touch)
            }

            var moveEvent = function (event) {

                if (down) {
                    console.log("move");

                    // if (resolved() == 0) {

                        // value = getThumbPosition();
                        value = getSlide().offset().top + getSlide().height() - getThumb().offset().top - event.pageY;
                    // }
                    // else if (resolved() < 0) {
                    //
                    //     value = 0;
                    // }
                    // else if (resolved() > 0) {
                    //
                    //     value = 100;
                    // }

                    // setThumbPosition(value/getSlide().height());

                    $scope.displayFactor(value / getSlide().height() * 100);

                    $scope.$apply();

                    setThumbPosition($scope.tempAmount);

                    console.log("temp amount", $scope.tempAmount, "amount", $scope.amount);
                }

            }


            var mouseup = function (e) {

                e.preventDefault();

                endEvent(e);
            }

            var touchend = function (e) {


                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                //CODE GOES HERE
                console.log(touch.pageY+' '+touch.pageX);

                endEvent(touch);

            }

            var endEvent = function (event) {

                console.log("up");

                down = false;
            }

            window.addEventListener("mousedown", mousedown);
            window.addEventListener("touchstart", touchstart);

            window.addEventListener("mousemove", mousemove);
            window.addEventListener("touchmove", touchmove);

            window.addEventListener("mouseup", mouseup);
            window.addEventListener("touchend", touchend);


        }
    }


}]);