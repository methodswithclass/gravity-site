interfaceModule.directive("slider", ["settings.service", 'data.service', function (settings, data) {

    return {
        scope: {
            orientation: "@",
            onChange: "=",
            initial:"="
        },
        replace:true,
        restrict: 'E',
        templateUrl: 'assets/views/slider.view.html',
        link:function ($scope, element, attr) {

            var util = mcaccel.utility;
            
            var o = {
                input:$scope.orientation,
                v: "vertical",
                h:"horizontal"
            }
            
            var min = 0;
            var max = 1;

            var getSlide = function () {
                return $("#slide");
            }

            var getThumb = function () {
                return $("#slider-thumb");
            }

            var slideMax = function () {
                var result = o.input == o.v ? getSlide().offset().top : getSlide().offset().left + getSlide().width();
                return result;
            }

            var slideMin = function () {
                var result = o.input == o.v ? getSlide().offset().top + getSlide().height() : getSlide().offset().left;
                return result;
            }

            var slideDimension = function () {

                var value = o.input == o.v ? getSlide().height() : getSlide().width();

                return  value/(max-min);
            }

            var resolveFactor = function (factor) {
                return factor < min ? min : (factor > max ? max : factor);
            }

            var getFactorFromValue = function (value) {

                var toggle = o.input == o.v ? 1 : -1;

                var result = toggle*(value - slideMax());
                var factor = max - result/slideDimension();
                factor = resolveFactor(factor);

                $scope.onChange(factor);
                return factor;
            }

            var setThumbCenterFromMax = function (factor) {
                var value = (factor < max ? max - factor : factor - max) * slideDimension() - getThumb().height() / 2;
                return value;
            }

            var setThumbPosition = function (value) {
                o.input == o.v ? getThumb().css({ top: value }) : getThumb().css({ right: value });
            }
            
            var mc;

            setTimeout(function () {

                $scope.onChange($scope.initial());
                setThumbPosition(setThumbCenterFromMax($scope.initial()));

                mc = new Hammer.Manager(getThumb()[0]);
                var Pan = new Hammer.Pan();
                mc.add(Pan);
                mc.get('pan').set({ direction: o.input == o.v ? Hammer.DIRECTION_VERTICAL : Hammer.DIRECTION_HORIZONTAL });
                mc.on('pan', function (e) {
                    value = o.input == o.v ? e.center.y : e.center.x;
                    setThumbPosition(setThumbCenterFromMax(getFactorFromValue(value)));
                });

            }, 200);

        }
    }


}]);