controllerModule.controller("valid.controller", ['$scope', 'global', 'state.service', 'data.service', 'utility.service', "general", function ($scope, g, states, data, util, general) {

	//console.log(" ");
	console.log("valid controller");

    $scope.isValid = util.isValid() ? "valid" : "invalid";

    $scope.messages = {
        valid:{
            background:"green3-back",
            font:"font-30", //font for message text
            news:"good news! :)",
            supported:"this device is supported",
            message:"please wait while the application loads..."
        },
        invalid:{
            background:"red-back",
            font:"font-20", // font for message text
            news:"sad news :(",
            supported:"this device is not supported",
            message:`

                this game requires an accelerometer <br>
                laptops usually don't have them these days <br>
                this device in particular doesn't appear to have one <br><br>
                <span><i class="fas fa-arrow-right"></i></span> try out on a mobile device, and enjoy!

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