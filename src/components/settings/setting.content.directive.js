settingsModule.directive("settingContent", [function () {

    return {
        restrict:'E',
        scope:false,
        replace:true,
        template:'<div ng-include="getContentUrl()"></div>',
        link:function ($scope, element, attr) {

            var setting = $scope.currentSetting();

            $scope.getContentUrl = function() {
                return "assets/views/settings/" + setting.view;
            }

        }

    }
}]);