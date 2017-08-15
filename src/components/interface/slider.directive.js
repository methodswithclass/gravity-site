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
                return getSlide().height();
            }

            var resolveFactor = function (factor) {

                //var factor = settings.settings.factor.normalize(_factor, "minmax");

                return factor < 0 ? 0 : (factor > 1 ? 1 : factor);
            }

            var getFactorFromValue = function (value) {

                var result = value - slideTop();
                //var normal = settings.settings.factor.normalize(result, "minmax")
                var factor = 1 - result / slideHeight();
                factor = resolveFactor(factor);

                $scope.displayFactor(factor);
                $scope.$apply();

                //return settings.settings.factor.normalize(factor);
                return factor;
            }

            var setThumbCenterFromTop = function (factor) {
                //console.log("set thumb top", factor, max, min, max - min, factor * (max - min), 1 - factor * (max - min));
                //var normal = factor * (max - min);
                //var normal = settings.settings.factor.normalize(factor, "minmax");
                var result = (factor < 1 ? 1-factor : factor-1) * slideHeight() - getThumb().height()/2;
                return result;
            }

            var setThumbPosition = function (factor) {
                getThumb().css({ top: setThumbCenterFromTop(factor) });
            }

            var initialFactor = settings.settings.factor.getSessionFactor();
            console.log("initial factor", initialFactor);
            //setThumbPosition(settings.settings.factor.normalize(initialFactor));
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