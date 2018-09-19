controllerModule.controller("settings.axes.controller", ['$scope', 'global', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {


    console.log("settings axes controller");


    $scope.settings = data.getSetting("axes");

    $scope.axes = {};
    $scope.axes.x = settings.settings.axes.getStateFromDir(settings.settings.axes.getCalibration("i"));
    $scope.axes.y = settings.settings.axes.getStateFromDir(settings.settings.axes.getCalibration("j"));


    $scope.setDir = function (axis, value) {

        console.log("set dir", axis, value);

        settings.settings.axes.setOverride(axis, value);
    }


    $scope.getMessage = function (toggle) {


        if (toggle) {

            return "standard";
        }
        else {
            return "switched";
        }
    }


    var initial = function () {

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

    // setTimeout(function () {
    //     initial();
    // }, 1000);


}]);