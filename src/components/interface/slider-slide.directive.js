interfaceModule.directive("sliderSlide", ["settings.service", 'data.service', function (settings, data) {

    return {
        scope: false,
        replace: true,
        restrict: 'E',
        template: '<div ng-include="getContentUrl()"></div>',
        link: function ($scope, element, attr) {

            var o = {
                input:$scope.orientation,
                v: "vertical",
                h: "horizontal"
            }

            $scope.getContentUrl = function() {
                return "assets/views/slider." + (o.input == o.v ? "v" : "h") + ".view.html";
            }

   

        }
    }



}]);

