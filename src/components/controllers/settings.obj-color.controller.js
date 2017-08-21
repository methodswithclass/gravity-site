controllerModule.controller("settings.obj-color.controller", ['$scope', 'global.service', 'state.service', 'data.service', 'settings.service', 'utility.service', 'manager.service', function ($scope, g, states, data, settings, utility, manager) {


    console.log("settings object color controller");

    var util = mcaccel.utility;

    $scope.settings = data.getSetting("obj-color");

    console.log("settings", $scope.settings);

    console.log("marbles", $scope.settings.marbles);

    $scope.chooseObj = function (marble) {

        if (marble) {
            console.log("marble", marble.id);

            manager.changeObject(marble);
        }
        else {
            console.log("marble default");
            manager.changeObject({ id: "default" });
        }

        settings.settings.closeSetting();
    }


}]);