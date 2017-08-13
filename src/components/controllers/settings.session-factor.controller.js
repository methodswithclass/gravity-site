controllerModule.controller("settings.session-factor.controller", ['$scope', 'global.service', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {


    console.log("settings session factor controller");

    var util = mcaccel.utility;

    $scope.settings = data.getPageById("settings").settings

    $scope.amount = settings.settings.factor.getSessionFactor();

    $scope.displayFactor = function (factor) {
        $scope.tempAmount = mcshared.utility.truncate(factor < 1 ? factor*100 : factor, 0);
    }

    $scope.displayFactor($scope.amount);

    $scope.save = function () {

        $scope.amount = $scope.tempAmount/100;

        settings.settings.factor.setFactor(util.const.factorS, $scope.amount);
    }


}]);