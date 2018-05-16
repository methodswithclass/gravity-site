controllerModule.controller("settings.axes.controller", ['$scope', 'global', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {


    console.log("settings axes controller");

    $scope.settings = data.getSetting("axes");

    $scope.axesDir = {};
    $scope.axesDir.x = settings.settings.axes.getStateFromDir(settings.settings.axes.getCalibration("i"));
    $scope.axesDir.y = settings.settings.axes.getStateFromDir(settings.settings.axes.getCalibration("j"));

    $scope.switched = {};

    var setSwitched = function() {

        $scope.switched.x = $scope.axesDir.x ? "switched" : "standard";
        $scope.switched.y = $scope.axesDir.y ? "switched" : "standard";
    }

    setSwitched();

    $scope.setDirection = function (axis) {

        setSwitched();
        settings.settings.axes.setOverride(axis, settings.settings.axes.getDirFromState(axis === "i" ? $scope.axesDir.x : $scope.axesDir.y));
    }


}]);