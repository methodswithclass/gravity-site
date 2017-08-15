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
            //var min = 0;
            //var max = 100;

            var getPage = function () {

                return $("#setting-sessionfactor");
            }

            var getSlide = function () {

                return $("#slide");
            }

            var getThumb = function () {

                return $("#slider-thumb");
            }

            var slideTop = function () {

                var result = getSlide().offset().top;

                //var result = getSlide().offset().top + getPage()[0].scrollTop

                //console.log("slide top", result);

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

            var resolve = function (value) {

                var topCheck = thumbCenter(value) >= slideTop();
                var bottomCheck = thumbCenter(value) <= slideBottom();

                return !topCheck ? 1 : (topCheck && bottomCheck ? 0 : (topCheck && !bottomCheck ? -1 : 0));
            }

            var resolveFactor = function (factor) {

                return factor < 0.05 ? 0.05 : (factor > 1.0 ? 1.0 : factor);
            }

            var convert = function (value, dir) {

                return (dir == "up" && value < 1 ) ? value*100 : ((dir == "down" && value > 1) ? value/100 : value);
            }

            var normalizeMinMax = function (factor) {

                return (max-min)*(factor-min)/100 + min;
            }

            var normalizePx = function (value) {

                return (slideTop() - slideBottom())*(value-slideBottom())/100 + slideBottom();
            }

            var setThumbCenterFromTop = function (factor) {

                var result = (1-factor) * slideHeight();

                console.log("thumb top", result);

                return result;
            }

            var setThumbPosition = function (factor) {
                
                getThumb().css({top:setThumbCenterFromTop(factor)});
            }

            var getFactorFromValue = function (value) {

                var result = value - slideTop();

                var factor = 1 - result / slideHeight();

                factor = resolveFactor(factor);

                $scope.displayFactor(factor);

                $scope.$apply();

                return factor;
            }

            setThumbPosition($scope.tempAmount/100);



            /////////////////////////////////////
            // drag events //////////////////////
            /////////////////////////////////////


            var mousedown = function (e) {

                e.preventDefault();

                startEvent(e);
            }

            var touchstart = function (e) {


                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                startEvent(touch);

            }

            var startEvent = function (event) {

                //console.log("down", event.clientY, event.pageY, getSlide().offset().top, getSlide().position().top, slideTop());

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

                    //if (resolve(event.clientY) == 0) {
                        console.log("clientY", event.clientY);
                        value = event.clientY;
                    //}
                    //else if (resolve(event.clientY) < 0) {
                    //    console.log("boundary 0");
                    //    setThumbPosition(getFactorFromValue(slideTop() + 20));
                    //    return;
                    //}
                    //else if (resolve(event.clientY) > 0) {
                    //    console.log("boundary 100");
                    //    setThumbPosition(getFactorFromValue(slideBottom() - 20));
                    //    return;
                    //}

                    
                    setThumbPosition(getFactorFromValue(value));
                }

            }


            var mouseup = function (e) {

                e.preventDefault();

                endEvent(e);
            }

            var touchend = function (e) {


                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                console.log(touch.pageY+' '+touch.pageX);

                endEvent(touch);

            }

            var endEvent = function (event) {

                down = false;
            }

            getThumb().bind("mousedown", mousedown);
            getThumb().bind("touchstart", touchstart);

            //window.addEventListener("mousedown", mousedown);
            //window.addEventListener("touchstart", touchstart);

            window.addEventListener("mousemove", mousemove);
            window.addEventListener("touchmove", touchmove);

            window.addEventListener("mouseup", mouseup);
            window.addEventListener("touchend", touchend);


        }
    }


}]);