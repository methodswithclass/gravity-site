controllerModule.controller("settings.controller", ['$scope', 'global.service', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {

	console.log("settings controller");

    $scope.settings = data.getPageById("settings").settings

    var currentSetting = null;
    var settingOpened = false;

    $scope.openSetting = function (id) {

        console.log("open settings", id);
        currentSetting = id;
        settingOpened = true;
        // if (id == "axes") axesInit();
    }

    $scope.closeSetting = function () {
        settingOpened = false;
    }

    $scope.currentSetting = function () {

        return $scope.settings.items.find(function (s) {
            console.log("find setting", s.id);
            return s.id === currentSetting;
        });
    }

    $scope.visible = function () {

        return settingOpened;
    }


}]);