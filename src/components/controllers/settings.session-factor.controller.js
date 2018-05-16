controllerModule.controller("settings.session-factor.controller", ['$scope', 'global', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {


    console.log("settings session factor controller");

    $scope.settings = data.getSetting("session-factor");

    $scope.sliderValue = settings.settings.factor.getSessionFactor();

    var min = settings.settings.factor.min;
    var max = settings.settings.factor.max;

    $scope.save = function (factor) {
        var p = factor;
        var $factor = p > max ? p / 100 : (p < min ? p * 100 : p);

        settings.settings.factor.setSessionFactor($factor);
        settings.settings.closeSetting();
    }

    $scope.initialValue = function () {

        return (settings.settings.factor.getSessionFactor()- min)/(max-min);
    }

    var displayFactor = function ($value) {

        var value = ($value * (max - min) + min)* 100

        $scope.sliderValue = mcshared.utility.truncate(value, 0);
        settings.settings.factor.setSessionFactor(value/100);

        $scope.$apply();
    }

    $scope.change = function (factor) {

        displayFactor(factor);
        
    }

}]);