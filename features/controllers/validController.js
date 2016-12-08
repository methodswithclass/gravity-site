controllerModule.controller("ValidController", ['$scope', 'global', 'states', 'data.service', 'utility', function ($scope, g, states, data, util) {

	//console.log(" ");
	console.log("valid controller");

    if (util.isValid()) {
        console.log("########## is valid ############");
        //self.valid = true;

        setTimeout(function () {
            states.go("page.calibrate");
        }, 2000);
    }
    else {
        console.log("########## is not valid ############");
    }

}])