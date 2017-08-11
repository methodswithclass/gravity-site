controllerModule.controller("settings.axes.controller", ['$scope', 'global.service', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {


    console.log("settings axes controller");

    var util = mcaccel.utility;

    $scope.settings = data.getPageById("settings").settings
    // $scope.xswitched = settings.getDirState(util.getAxis(util.const.x)) ? utility.deviceStandard.switched : utility.deviceStandard.standard;
    // $scope.yswitched = settings.getDirState(util.getAxis(util.const.y)) ? utility.deviceStandard.switched : utility.deviceStandard.standard;

    // var calibration = {};
    // calibration.x;
    // calibration.y;


    // var getCalibration = function () {
    //
    //     calibration.x = util.getAxis(util.const.x);
    //     calibration.y = util.getAxis(util.const.y);
    // }

    $scope.axesDir = {};
    $scope.axesDir.x = settings.getDirState(util.getAxis(util.const.x));
    $scope.axesDir.y = settings.getDirState(util.getAxis(util.const.y));

    if (!settings.settings.direction.axesSet()) {
        settings.settings.direction.axesSet(true);
        // getCalibration();
        $scope.axesDir.x = false;
        $scope.axesDir.y = false;
    }
    $scope.switched = {};

    var setSwitched = function() {

        $scope.switched.x = $scope.axesDir.x ? "switched" : "standard";
        $scope.switched.y = $scope.axesDir.y ? "switched" : "standard";

        // calibration.x = settings.getStateDir($scope.axesDir.x);
        // calibration.y = settings.getStateDir($scope.axesDir.y);

    }


    setSwitched();

    $scope.setDirection = function (axis) {

        console.log("set direction for", axis, "where 'i' is", settings.getStateDir($scope.axesDir.x), "and 'j' is", settings.getStateDir($scope.axesDir.y));

        setSwitched();

        settings.settings.direction.setOverride(axis, settings.getStateDir(axis === "i" ? $scope.axesDir.x : $scope.axesDir.y));

        // var native = settings.getStateDir(axis === "i" ? calibration.x : calibration.y);
        // var override =
        // var direction = native*override;

        // settings.settings.direction.changeDirection(axis, settings.getStateDir(axis === "i" ? $scope.axesDir.x : $scope.axesDir.y));
    }


}]);