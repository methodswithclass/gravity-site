controllerModule.controller("settings.obj-color.controller", ['$scope', 'global', 'state.service', 'data.service', 'settings.service', 'utility.service', 'manager.service', function ($scope, g, states, data, settings, utility, manager) {


    console.log("settings object color controller");

    var util = mcaccel.utility;

    $scope.settings = data.getSetting("obj");

    var marbles = $scope.settings.marbles;

    $scope.sliderValue = settings.settings.obj.currentSize();
    $scope.selectedObj = settings.settings.obj.currentObj();


    var min = settings.settings.obj.min;
    var max = settings.settings.obj.max;

    var deselectAll = function () {

        for (var i in $scope.settings.marbles) {

            $scope.settings.marbles[i].selected = false;
        }

    }


    var changeObj = function () {

        for (var i in marbles) {

            marbles[i].size = $scope.sliderValue;
            $scope.selectedObj.size = $scope.sliderValue;
        }

        // $scope.selectedObj.size = $scope.sliderValue;

        settings.settings.obj.setSize($scope.sliderValue);
        settings.settings.obj.setObj($scope.selectedObj);
        manager.changeObject($scope.selectedObj);

    }
    

    $scope.selectObj = function (marble) {

        deselectAll();
        data.getMarble(marble.id).selected = true;

        $scope.selectedObj = marble;

        changeObj();
    }

    $scope.selectObj($scope.selectedObj);

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
        
        changeObj();

        $scope.$apply();
    }

    $scope.change = function (factor) {

        displayValue(factor);
    }


}]);