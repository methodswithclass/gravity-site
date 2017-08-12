controllerModule.controller("settings.axes.controller", ['$scope', 'global.service', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {


    console.log("settings axes controller");

    // var util = mcaccel.utility;

    $scope.settings = data.getPageById("settings").settings;

    $scope.axesDir = {};
    $scope.axesDir.x = settings.getDirState(settings.getCalibration("i"));
    $scope.axesDir.y = settings.getDirState(settings.getCalibration("j"));

    $scope.switched = {};

    var setSwitched = function() {

        $scope.switched.x = $scope.axesDir.x ? "switched" : "standard";
        $scope.switched.y = $scope.axesDir.y ? "switched" : "standard";
    }

    setSwitched();

    $scope.setDirection = function (axis) {

        setSwitched();
        settings.settings.direction.setOverride(axis, settings.getStateDir(axis === "i" ? $scope.axesDir.x : $scope.axesDir.y));
    }


}]);