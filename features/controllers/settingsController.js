controllerModule.controller("SettingsController", ['$scope', 'global', 'states', 'data.service', 'settings.service', 'utility', function ($scope, g, states, data, settings, utility) {

    var self = this;

    var util = mcaccel.utility;

	//console.log(" ");
	console.log("settings controller");
	


    $scope.xswitched = utility.deviceStandard.standard;
    $scope.yswitched = utility.deviceStandard.standard;

    var setDevice = function (axes, dir) {

        console.log("new setDevice", axes, dir);

        $scope[axes == util.const.x ? "xswitched" : "yswitched"] = dir > 0 ? utility.deviceStandard.standard : utility.deviceStandard.switched;
    }


	setTimeout(function () {

    	settings.settings.direction.addSetter(setDevice);

    }, 500);


}]);