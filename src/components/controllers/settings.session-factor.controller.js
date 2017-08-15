controllerModule.controller("settings.session-factor.controller", ['$scope', 'global.service', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {


    console.log("settings session factor controller");

    var util = mcaccel.utility;

    $scope.settings = data.getPageById("settings").settings

    $scope.displayFactor = function (factor) {
        $scope.percent = mcshared.utility.truncate(factor * 100, 0);
    }

    var factor = settings.settings.factor.getSessionFactor();
    console.log("session factor", factor);
    $scope.displayFactor(factor);

    $scope.save = function () {
        var p = $scope.percent;
        var min = settings.settings.factor.min;
        var max = settings.settings.factor.max;
        var $factor = p > max ? p/100 : (p < min ? p*100 : p);

        settings.settings.factor.setFactor(util.const.factorS, $factor);
    }


}]);