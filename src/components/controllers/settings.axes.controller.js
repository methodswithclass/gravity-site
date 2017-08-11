controllerModule.controller("settings.axes.controller", ['$scope', 'global.service', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {


    console.log("settings axes controller");

    var util = mcaccel.utility;

    $scope.settings = data.getPageById("settings").settings
    // $scope.xswitched = settings.getDirState(util.getAxis(util.const.x)) ? utility.deviceStandard.switched : utility.deviceStandard.standard;
    // $scope.yswitched = settings.getDirState(util.getAxis(util.const.y)) ? utility.deviceStandard.switched : utility.deviceStandard.standard;

    var cacheCalibration = {};

    var cache = function () {

        cacheCalibration.x = settings.getDirState(util.getAxis(util.const.x));
        cacheCalibration.y = settings.getDirState(util.getAxis(util.const.y));
    }

    $scope.axesDir = {};
    $scope.axesDir.x = false;
    $scope.axesDir.y = false;

    $scope.switched = {};

    var setSwitched = function() {

        $scope.switched.x = $scope.axesDir.x ? "switched" : "standard";
        $scope.switched.y = $scope.axesDir.y ? "switched" : "standard";
    }

    if (!settings.settings.axesSet()) {
        settings.settings.axesSet(true);
        cache();
    }
    setSwitched();

    $scope.setDirection = function (axis) {

        console.log("set direction for", axis, "where 'i' is", settings.getStateDir($scope.axesDir.x), "and 'j' is", settings.getStateDir($scope.axesDir.y));

        setSwitched();

        var cache = settings.getStateDir(axis === "i" ? cacheCalibration.x : cacheCalibration.y);
        var calibration = settings.getStateDir(axis === "i" ? $scope.axesDir.x : $scope.axesDir.y);
        var direction = cache*calibration;

        settings.settings.direction.changeDirection(axis, direction);
    }


}]);