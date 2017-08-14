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

            var min = settings.settings.factor.min;
            var max = settings.settings.factor.max;

            var getSlide = function () {

                return $("#slide");
            }

            var getThumb = function () {

                return $("#slider-thumb");
            }

            var slideTop = function () {

                var result = getSlide().offset().top;

                console.log("slide top", result);

                return result;
            }

            var slideHeight = function () {

                return getSlide().height();
            }

            var slideBottom = function () {

                return slideTop() + slideHeight();
            }

            var thumbCenter = function (value) {

                return slideHeight() - (value ? value : getThumb().position().top) + getThumb().height()/2;
            }

            // var setThumbRelativeToSlideTop = function (value) {

            //     var result = slideTop() + slideHeight() - setThumbCenter(value);

            //     console.log("thumb relative to slide top", result)

            //     return result;
            // }

            // var setThumbRelativeToSlideBottom = function (value) {

            //     return slideHeight() - (slideBottom() - setThumbCenter(value));
            // }

            // var getValueRelativeTopSlideTop = function (value) {

            //     return slideHeight() - (value - slideTop());
            // }

            // var getValueRelativeToSlideBottom = function (value) {

            //     return slideHeight() - (slideBottom() - value);
            // }

            // var getThumbRelativeToTop = function () {

            //     return slideHeight() - (slideTop() + thumbCenter());
            // }

            // var getThumbRelativeToBottom = function () {

            //     return slideBottom() - thumbCenter();
            // }

            // var getValuePosition = function (value) {

            //     console.log("value", value);

            //     return getSlide().offset().top + getSlide().height() - value - getThumb().height()/2;
            // }


            // var getSliderValue = function () {

            //     return getThumbPosition()/getThumb().height();
            // }

            // var thumbValue = function (val) {

            //     var top = (1-val)*getSlide().height();
            //     var half = getThumb().height()/4;

            //     return top - half;
            // }

            var resolve = function (value) {

                var topCheck = thumbCenter(value) >= slideTop();
                var bottomCheck = thumbCenter(value) <= slideBottom();

                return !topCheck ? 1 : (topCheck && bottomCheck ? 0 : (topCheck && !bottomCheck ? -1 : 0));
            }

            var convert = function (value, dir) {

                return (dir == "up" && value < 1 ) ? value*100 : ((dir == "down" && value > 1) ? value/100 : value);
            }

            var normalizeMinMax = function (value) {

                return (max-min)*(value-min)/100 + min;
            }

            var normalizePx = function (value) {

                return (slideTop() - slideBottom())*(value-slideBottom())/100 + slideBottom();
            }

            var setThumbCenterFromTop = function (value) {

                //var result = slideHeight() - normalizeMinMax(value);

                var result = value;

                console.log("set thumb center, value: ", value, "result: ", result);

                return result;
            }

            var setThumbPosition = function (value) {

                console.log("set thumb position", value);
                // getThumb().css({top:thumbValue(convert(value, "down")) + "px"});
                getThumb().css({top:setThumbCenterFromTop(value)});
            }

            //var processFor = function (value) {

            //    var normal = normalizeMinMax(value);
            //    console.log("normal", normal);
            //    var converted = convert(normal, "up");

            //    console.log("convert", converted);
            //    return converted;
            //}

            var processValue = function (value) {

                //$scope.displayFactor(value/slideHeight()*100);

                //$scope.$apply();

                setThumbPosition(value);

                console.log("temp amount", $scope.tempAmount);
            }

            console.log("set thumb position at temp amount", $scope.tempAmount);

            setThumbPosition(processFor($scope.tempAmount));



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

                console.log("down", event.clientY, event.pageY);

                down = true;
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
                    console.log("move", event.clientY);

                    if (resolve(event.clientY) == 0) {
                        //value = getValueRelativeToSlideBottom(event.pageY);
                        value = event.clientY;
                    }
                    else if (resolve(event.clientY) < 0) {
                    
                        value = 0;
                    }
                    else if (resolve(event.clientY) > 0) {
                    
                        value = 100;
                    }

                    
                    processValue(value);
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

            getThumb().bind("mousedown", mousedown);
            getThumb().bind("touchstart", touchstart);

            //window.addEventListener("mousedown", mousedown);
            //window.addEventListener("touchstart", touchstart);

            getSlide().bind("mousemove", mousemove);
            getSlide().bind("touchmove", touchmove);

            window.addEventListener("mouseup", mouseup);
            window.addEventListener("touchend", touchend);


        }
    }


}]);