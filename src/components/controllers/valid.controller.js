controllerModule.controller("valid.controller", ['$scope', 'global', 'state.service', 'data.service', 'utility.service', "general", function ($scope, g, states, data, util, general) {

	//console.log(" ");
	console.log("valid controller");

    $scope.isValid = util.isValid() ? "valid" : "invalid";

    $scope.messages = {
        valid:{
            background:"green3-back",
            font:"font-30", //font for message text
            news:"good news :)",
            supported:"this device is supported",
            message:"please wait while the application loads..."
        },
        invalid:{
            background:"red-back",
            font:"font-20", // font for message text
            news:"bad news :(",
            supported:"this device is not supported",
            message:`

                this game requires an accelerometer <br>
                this device does not appear to have one <br><br>
                try on a mobile device

            `
        }
    }

    $scope.getMessage = function (valid, type) {

        return $scope.messages[valid][type]
    }

    $scope.trustHtml = function (html) {

        return general.renderHtml(html)
    }

}])