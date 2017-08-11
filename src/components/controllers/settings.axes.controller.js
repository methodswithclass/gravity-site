controllerModule.controller("settings.axes.controller", ['$scope', 'global.service', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {


    console.log("settings axes controller");

    var util = mcaccel.utility;

    $scope.settings = data.getPageById("settings").settings;

    $scope.axesDir = {};
    $scope.axesDir.x = settings.getDirState(util.getAxis(util.const.x));
    $scope.axesDir.y = settings.getDirState(util.getAxis(util.const.y));

    if (!settings.settings.direction.axesSet()) {
        settings.settings.direction.axesSet(true);
        $scope.axesDir.x = false;
        $scope.axesDir.y = false;
    }
    $scope.switched = {};

    var setSwitched = function() {

        $scope.switched.x = $scope.axesDir.x ? "switched" : "standard";
        $scope.switched.y = $scope.axesDir.y ? "switched" : "standard";

    }
    
    setSwitched();

    $scope.setDirection = function (axis) {

        console.log("set direction for", axis, "where 'i' is", settings.getStateDir($scope.axesDir.x), "and 'j' is", settings.getStateDir($scope.axesDir.y));

        setSwitched();

        // settings.settings.direction.setOverride(axis, settings.getStateDir(axis === "i" ? $scope.axesDir.x : $scope.axesDir.y));
        settings.settings.direction.setOverride(axis, -1);
    }


}]);