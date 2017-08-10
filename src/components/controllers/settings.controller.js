controllerModule.controller("settings.controller", ['$scope', 'global.service', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {

    var util = mcaccel.utility;

	console.log("settings controller");

    $scope.settings = data.getPageById("settings").settings
    $scope.xswitched = utility.deviceStandard.standard;
    $scope.yswitched = utility.deviceStandard.standard;

    $scope.axesDir = {};
    $scope.axesDir.x = settings.getState(util.getAxis(util.const.x));
    $scope.axesDir.y = settings.getState(util.getAxis(util.const.y));

    $scope.switched = {};

    var setSwitched = function() {

        $scope.switched.x = $scope.axesDir.x ? "switched" : "standard";
        $scope.switched.y = $scope.axesDir.y ? "switched" : "standard";

    }

    setSwitched();

    $scope.setDirection = function (axes) {

        console.log("set direction for", axes, "where 'i' is", settings.getDir($scope.axesDir.x), "and 'j' is", settings.getDir($scope.axesDir.y));

        setSwitched();

        settings.settings.direction.changeDirection(axes, settings.getDir(axes === "i" ? $scope.axesDir.x : $scope.axesDir.y));
    }


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


    setTimeout(function () {

    	settings.settings.direction.registerSetter($scope.setDirection);
    	// settings.settings.init.registerInit(axesInit);

    }, 500);


}]);