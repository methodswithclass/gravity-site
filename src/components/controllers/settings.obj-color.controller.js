controllerModule.controller("settings.obj-color.controller", ['$scope', 'global.service', 'state.service', 'data.service', 'settings.service', 'utility.service', 'manager.service', function ($scope, g, states, data, settings, utility, manager) {


    console.log("settings object color controller");

    var util = mcaccel.utility;

    $scope.settings = data.getSetting("obj-color");

    console.log("settings", $scope.settings);

    console.log("marbles", $scope.settings.marbles);

    $scope.sliderValue = settings.settings.obj.currentSize();
    $scope.selectedObj = settings.settings.obj.currentObj();

    var min = settings.settings.obj.min;
    var max = settings.settings.obj.max;

    var deselectAll = function () {

        for (var i in $scope.settings.marbles) {

            $scope.settings.marbles[i].selected = false;
        }

    }

    var getMarble = function (id) {

        return $scope.settings.marbles.find(function (p) {

            return p.id == id;
        });
    }

    $scope.selectObj = function (marble) {

        deselectAll();
        getMarble(marble.id).selected = true;
        $scope.selectedObj = marble;
        //$scope.$apply();
    }

    $scope.save = function () {
        
        $scope.selectedObj.size = $scope.sliderValue;

        settings.settings.obj.setSize($scope.sliderValue);
        settings.settings.obj.setObj($scope.selectedObj);
        manager.changeObject($scope.selectedObj);

        settings.settings.closeSetting();
    }

    $scope.initialValue = function () {

        return (settings.settings.obj.currentSize()-min)/(max-min);
    }

    var displayValue = function ($value) {

        var value = $value * (max-min) + min;

        $scope.sliderValue = mcshared.utility.truncate(value, 0);
        $scope.$apply();
    }

    $scope.change = function (factor) {

        displayValue(factor);
    }


}]);