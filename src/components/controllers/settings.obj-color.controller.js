controllerModule.controller("settings.obj-color.controller", ['$scope', 'global.service', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {


    console.log("settings object color controller");

    var util = mcaccel.utility;

    $scope.settings = data.getPageById("settings").settings





}]);