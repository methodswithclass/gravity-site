controllerModule.controller("settings.axes.controller", ['$scope', 'global', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {


    console.log("settings axes controller");


    $scope.settings = data.getSetting("axes");

    $scope.axes = {};
    $scope.axes.x = settings.settings.axes.getStateFromDir(settings.settings.axes.getCalibration("i"));
    $scope.axes.y = settings.settings.axes.getStateFromDir(settings.settings.axes.getCalibration("j"));

    var setBackground = function (axis, value) {

        $("#" + axis + "-" + (value == -1 ? "stand" : "switch")).removeClass("toggleSwitch");
        $("#" + axis + "-" + (value == -1 ? "switch" : "stand")).addClass("toggleSwitch");
    }


    $scope.setDir = function (axis, value) {

        console.log("set dir", axis, value);

        settings.settings.axes.setOverride(axis, value);

        setBackground(axis, value);
    }


    var initial = function () {


        setBackground("i", settings.settings.axes.getDirFromState($scope.axes.x));
        setBackground("j", settings.settings.axes.getDirFromState($scope.axes.y));


        console.log("checked", $(":input").length, $scope.axes);

        $(":input").each(function (index) {

            console.log("input", $(this)[0].id);

            if ($(this)[0].id.indexOf("i") != -1) {
                $(this).prop("checked", $scope.axes.x)
            }
            else {
                $(this).prop("checked", $scope.axes.y)
            }
        })

    }

   initial();



}]);