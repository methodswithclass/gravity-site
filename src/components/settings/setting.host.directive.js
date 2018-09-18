settingsModule.directive("settingHost", ["settings.service", function (settings) {

    return {
        restrict:'E',
        scope:false,
        replace:true,
        templateUrl:'assets/views/settings/setting.host.view.html',
        link:function ($scope, element, attr) {

        	$scope.closeSetting = function () {

        		settings.settings.closeSetting();
        	}

        }

    }
}]);