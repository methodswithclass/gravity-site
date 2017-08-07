settingsModule.directive("settingHost", [function () {

    return {
        restrict:'E',
        scope:false,
        replace:true,
        templateUrl:'assets/views/settings/setting.host.view.html',
        link:function ($scope, element, attr) {

        }

    }
}]);