controllerModule.controller("settings.controller", ['$scope', 'global.service', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {

    var util = mcaccel.utility;

	console.log("settings controller");

    var currentSetting = null;
    var settingOpened = false;

    $scope.settings = data.getPageById("settings").settings
    $scope.xswitched = utility.deviceStandard.standard;
    $scope.yswitched = utility.deviceStandard.standard;

    $scope.axesDir = {};
    $scope.axesDir.x = util.getAxis(util.const.x);
    $scope.axesDir.y = util.getAxis(util.const.y);

    // var toggle = {}

    // var axesInit = function () {
    //
    //     setTimeout(function () {
    //         console.log("initialize");
    //         toggle.x = $("#switch.x")[0];
    //         toggle.y = $("#switch.y")[0];
    //         if (toggle.x && toggle.y) {
    //             toggle.x.checked = settings.getState($scope.axesDir.x);
    //             toggle.y.checked = settings.getState($scope.axesDir.y);
    //         }
    //     },1000);
    //
    // }

    // var toggleDirection = function () {
    //
    //     toggle.x = document.getElementById("switch.x");
    //     toggle.y = $("#switch.y")[0];
    //     if (toggle.x && toggle.y) {
    //         console.log("toggleX checked", toggle.x.checked);
    //         $scope.axesDir.x = settings.getDir(toggle.x.checked);
    //         $scope.axesDir.y = settings.getDir(toggle.y.checked);
    //     }
    // }

    $scope.setDirection = function (axes) {

        // toggleDirection();

        console.log("set direction for", axes, "where 'i' is", settings.getDir($scope.axesDir.x), "and 'j' is", settings.getDir($scope.axesDir.y));

        settings.settings.direction.changeDirection(axes, settings.getDir(axes === "i" ? $scope.axesDir.x : $scope.axesDir.y));
    }

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