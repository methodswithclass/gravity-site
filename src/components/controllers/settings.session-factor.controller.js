controllerModule.controller("settings.session-factor.controller", ['$scope', 'global.service', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {


    console.log("settings session factor controller");

    var util = mcaccel.utility;

    $scope.settings = data.getPageById("settings").settings






}]);