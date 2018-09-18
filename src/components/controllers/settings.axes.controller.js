controllerModule.controller("settings.axes.controller", ['$scope', 'global', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {


    console.log("settings axes controller");


    $scope.settings = data.getSetting("axes");

    $scope.axesDir = {};
    $scope.axesDir.x = settings.settings.axes.getStateFromDir(settings.settings.axes.getCalibration("i"));
    $scope.axesDir.y = settings.settings.axes.getStateFromDir(settings.settings.axes.getCalibration("j"));


    $scope.setDir = function (axis, value) {

        settings.settings.axes.setOverride(axis, value);
    }


    var initial = function () {

        console.log("checked", $(":input").length, $scope.axesDir);


        $(":input").each(function (index) {

            console.log("input", $(this)[0].id);

            if ($(this)[0].id.indexOf("x") != -1) {
                $(this).prop("checked", $scope.axesDir.x)
            }
            else {
                $(this).prop("checked", $scope.axesDir.y)
            }
        })

    }

    initial();


}]);