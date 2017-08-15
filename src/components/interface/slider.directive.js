interfaceModule.directive("slider", ["settings.service", function (settings) {

    return {
        scope:false,
        replace:true,
        restrict:'E',
        templateUrl:"/assets/views/slider.view.html",
        link:function ($scope, element, attr) {

            var down = false;

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
                return result;
            }

            var slideHeight = function () {
                return getSlide().height()/(max-min);
            }

            var resolveFactor = function (factor) {
                return factor < min ? min : (factor > max ? max : factor);
            }

            var getFactorFromValue = function (value) {

                var result = value - slideTop();
                var factor = max - result / slideHeight();
                factor = resolveFactor(factor);

                $scope.displayFactor(factor);
                $scope.$apply();
                return factor;
            }

            var setThumbCenterFromTop = function (factor) {
                var result = (factor < max ? max-factor : factor-max) * slideHeight() - getThumb().height()/2;
                return result;
            }

            var setThumbPosition = function (factor) {
                getThumb().css({ top: setThumbCenterFromTop(factor) });
            }

            var initialFactor = settings.settings.factor.getSessionFactor();
            console.log("initial factor", initialFactor);
            setThumbPosition(initialFactor);



            /////////////////////////////////////
            // drag events //////////////////////
            /////////////////////////////////////


            var mousedown = function (e) {
                e.preventDefault();
                startEvent(e);
            }
            var touchstart = function (e) {
                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                console.log("touch down");
                startEvent(touch);
            }
            var startEvent = function (event) {
                console.log("down", event.clientY, event.pageY, getSlide().offset().top, getSlide().position().top, slideTop());
                down = true;
            }

            var mousemove = function (e) {
                e.preventDefault();
                moveEvent(e);
            }
            var touchmove = function (e) {
                e.preventDefault();
                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                console.log("touch move", touch);
                moveEvent(touch)
            }
            var moveEvent = function (event) {
                if (down) {
                    console.log("clientY", event.clientY);
                    value = event.clientY;
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

            window.addEventListener("mousemove", mousemove);
            window.addEventListener("touchmove", touchmove);

            window.addEventListener("mouseup", mouseup);
            window.addEventListener("touchend", touchend);
        }
    }


}]);