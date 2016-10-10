controllerModule.controller("CheckingController", ['$scope', '$document', 'validate.wrapper', 'states', 'events', 'con', 'utility', function ($scope, $document, validation, states, events, con, util) {

    console.log("checking controller");

    $scope.getContentUrl = function() {
    
        var view = "checking.html";

        return 'views/' + view;
    }

    events.on("console", function () {
        return con.isRegistered();
    });

    var result; 

    if (util.isForced()) {
        result = validation.force();
    }
    else {
        result = validation.run();
    }

    setTimeout(function () {

        result.then( 
        function (path) { //valid
            console.log("device valid");
            // states.go("modal.valid");
            util.setValidity(true);
            states.go("page.validity");
        },
        function (path) { //invalid
            console.log("device invalid");
            //states.go("modal.invalid");
            util.setValidity(false);
            states.go("page.validity");
        });

    }, 1000);


    // ===================== ON READY =====================

    angular.element($document).ready(function () {
        con.register($("#consoleContainer"));
        con.attach();
    });

}])