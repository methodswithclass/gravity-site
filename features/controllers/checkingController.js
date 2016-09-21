controllerModule.controller("CheckingController", ['$scope', 'validate.service', 'states', function ($scope, checkDevice, states) {

    console.log("checking controller");

    $scope.getContentUrl = function() {
    
        var view = "checking.html";

        return 'features/views/' + view;
    }

    var result = checkDevice.run();

    setTimeout(function () {

        result.then( 
        function (path) { //valid
            //console.log("change location to " + path);
            console.log("device valid");
            states.go("page.calibrate");
        },
        function (path) { //invalid
            //console.log("change location to " + path);
            states.go("invalid");
        });

    }, 1000);

    

}])