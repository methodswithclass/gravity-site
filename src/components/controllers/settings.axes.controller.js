controllerModule.controller("settings.axes.controller", ['$scope', 'global', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {


    console.log("settings axes controller");

    var prevDir = null;

    $scope.settings = data.getSetting("axes");

    $scope.axesDir = {};
    $scope.axesDir.x = settings.settings.axes.getStateFromDir(settings.settings.axes.getCalibration("i"));
    $scope.axesDir.y = settings.settings.axes.getStateFromDir(settings.settings.axes.getCalibration("j"));

    $scope.switched = {};

    var setSwitched = function() {

        $scope.switched.x = $scope.axesDir.x ? "switched" : "standard";
        $scope.switched.y = $scope.axesDir.y ? "switched" : "standard";
    }

    // setSwitched();

    $scope.setDir = function (axis, value) {


        settings.settings.axes.setOverride(axis, value);

    }

    $scope.setDirection = function (axis) {

        setSwitched();
    }



    var initial = function () {

        console.log("checked", $("#standard.x")[0], $scope.axesDir);

        $("#standard.x").prop("checked", $scope.axesDir.x);
        $("#standard.y").prop("checked", $scope.axesDir.y);

        $("#switched.x").prop("checked", $scope.axesDir.x);
        $("#switched.y").prop("checked", $scope.axesDir.y);

    }

    setTimeout(function () {
        initial();
    }, 1000)


}]);