controllerModule.controller("settings.controller", ['$scope', 'global.service', 'state.service', 'data.service', 'settings.service', 'utility.service', function ($scope, g, states, data, settings, utility) {

    var self = this;

    var util = mcaccel.utility;

	//console.log(" ");
	console.log("settings controller");


    var panels = [
        "setting-sessionfactor",
        "setting-axes",
        "setting-3",
        "setting-4",
        "setting-5",
        "setting-6",
        "setting-7",
        "setting-8",
        "setting-9"
    ]

    var makeSizes = function () {

        var win = {
            width:$(window).width(),
            height:$(window).height()
        }

        var panel = {
            width:win.width,
            height:win.height
        }

        var pn = panels.length/3;
        var ifac = 1.1;
        var bf = 1.2;
        var cf = 1.4;
        var pf = 1;

        for (i in panels) {

            $("#" + panels[i]).css({width:panel.width*pf, height:panel.height*pf});
        }

        $("#settings-inner").css({width:win.width*pn*ifac, height:win.height*pn*ifac});
        $("#settings-body").css({width:win.width*pn*bf, height:win.height*pn*bf});
        $("#settings-container").css({width:win.width*pn*cf, height:win.height*pn*cf});

    }   


    setTimeout(function () {
        makeSizes();
    }, 500)



    $scope.xswitched = utility.deviceStandard.standard;
    $scope.yswitched = utility.deviceStandard.standard;

    var setDirection = function (axes, dir) {

        console.log("new setDevice", axes, dir);

        settings.settings.direction.changeDirection(axes, dir);

        $scope[axes == util.const.x ? "xswitched" : "yswitched"] = dir > 0 ? utility.deviceStandard.standard : utility.deviceStandard.switched;
    }


	setTimeout(function () {

    	settings.settings.direction.registerSetter(setDirection);

    }, 500);


}]);