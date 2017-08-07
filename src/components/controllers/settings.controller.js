controllerModule.controller("settings.controller", ['$scope', 'global.service', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {

    var util = mcaccel.utility;

	console.log("settings controller");

    var currentSetting = null;
    var settingOpened = false;

    $scope.settings = data.getPageById("settings").settings
    $scope.xswitched = utility.deviceStandard.standard;
    $scope.yswitched = utility.deviceStandard.standard;

    $scope["x-device-dir"] = util.getAxis(util.const.x) > 0 ? true : false;
    $scope["y-device-dir"] = util.getAxis(util.const.y) > 0 ? true : false;

    $scope.setDirection = function (axes, dir) {

        console.log("new setDevice", axes, dir);

        settings.settings.direction.changeDirection(axes, dir);

        // $scope[axes == util.const.x ? "x-device-dir" : "y-device-dir"] = dir ? utility.deviceStandard.standard : utility.deviceStandard.switched;
    }

    $scope.openSetting = function (id) {

        console.log("open settings", id);
        currentSetting = id;
        settingOpened = true;
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


    setTimeout(function () {

    	settings.settings.direction.registerSetter($scope.setDirection);

    }, 500);


}]);