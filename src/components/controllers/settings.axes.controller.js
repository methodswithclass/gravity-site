controllerModule.controller("settings.axes.controller", ['$scope', 'global.service', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {


    console.log("settings axes controller");

    var util = mcaccel.utility;

    $scope.settings = data.getPageById("settings").settings
    $scope.xswitched = settings.getState(util.getAxis(util.const.x)) ? utility.deviceStandard.switched : utility.deviceStandard.standard;
    $scope.yswitched = settings.getState(util.getAxis(util.const.y)) ? utility.deviceStandard.switched : utility.deviceStandard.standard;

    $scope.axesDir = {};
    $scope.axesDir.x = settings.getState(util.getAxis(util.const.x));
    $scope.axesDir.y = settings.getState(util.getAxis(util.const.y));

    $scope.switched = {};

    var setSwitched = function() {

        $scope.switched.x = $scope.axesDir.x ? "switched" : "standard";
        $scope.switched.y = $scope.axesDir.y ? "switched" : "standard";
    }

    setSwitched();

    $scope.setDirection = function (axis) {

        console.log("set direction for", axis, "where 'i' is", settings.getDir($scope.axesDir.x), "and 'j' is", settings.getDir($scope.axesDir.y));

        setSwitched();

        settings.settings.direction.changeDirection(axis, settings.getDir(axis === "i" ? $scope.axesDir.x : $scope.axesDir.y));
    }


}]);