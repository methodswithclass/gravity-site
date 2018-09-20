controllerModule.controller("settings.axes.controller", ['$scope', 'global', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {


    console.log("settings axes controller");


    $scope.settings = data.getSetting("axes");

    $scope.axes = {};
    $scope.axes.x = settings.settings.axes.getStateFromDir(settings.settings.axes.getCalibration("i"));
    $scope.axes.y = settings.settings.axes.getStateFromDir(settings.settings.axes.getCalibration("j"));

    var setBackground = function (axis, state) {

        $("#" + axis + "-" + (state ? "stand" : "switch")).removeClass("toggleSwitch");
        $("#" + axis + "-" + (state ? "switch" : "stand")).addClass("toggleSwitch");
    }


    var haveClass = function (axis, state) {

        return $("#" + axis + "-" + (state ? "switch" : "stand")).hasClass("toggleSwitch");
    }


    $scope.setDir = function (axis, state) {

        // var state = settings.settings.axes.getStateFromDir(value)

        var value = settings.settings.axes.getDirFromState(state);

        console.log("set dir", axis, value);

        if (!haveClass(axis, state)) {
            settings.settings.axes.setOverride(axis, true);

            setBackground(axis, state);
        }
    }


    var initial = function () {


        setBackground("i", settings.settings.axes.getStateFromDir(utility.calibration.get("i")));
        setBackground("j", settings.settings.axes.getStateFromDir(utility.calibration.get("j")));


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