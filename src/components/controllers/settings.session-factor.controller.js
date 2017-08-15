controllerModule.controller("settings.session-factor.controller", ['$scope', 'global.service', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {


    console.log("settings session factor controller");

    var util = mcaccel.utility;

    $scope.settings = data.getPageById("settings").settings

    $scope.amount = settings.settings.factor.getSessionFactor();

    $scope.displayFactor = function (factor) {
        //console.log("display", factor);
        $scope.tempAmount = mcshared.utility.truncate(factor*100, 0);
        //console.log("display", $scope.tempAmount);
    }

    $scope.displayFactor($scope.amount);

    $scope.save = function () {

        $scope.amount = $scope.tempAmount > settings.factor.max ? $scope.tempAmount/100 : $scope.tempAmount;

        settings.settings.factor.setFactor(util.const.factorS, $scope.amount);
    }


}]);