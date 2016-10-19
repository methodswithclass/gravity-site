controllerModule.controller("CheckingController", ['$scope', '$document', 'validate.wrapper', 'states', 'events', 'con', 'utility', function ($scope, $document, validation, states, events, con, util) {

    console.log(" ");
    console.log("checking controller");


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

    result.then( 
    function (path) {
        console.log("device valid");

        util.setValidity(true);
        states.go("page.validity");
    },
    function (path) {
        console.log("device invalid");

        util.setValidity(false);
        states.go("page.validity");
    });


    // ===================== ON READY =====================

    angular.element($document).ready(function () {
        con.register($("#consoleContainer"));
        con.attach();
    });

}])