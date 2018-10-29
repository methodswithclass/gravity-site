controllerModule.controller("checking.controller", ['$scope', '$document', 'validate-wrapper.service', 'state.service', 'events', 'con.service', 'utility.service', function ($scope, $document, validation, states, events, con, util) {

    //console.log(" ");
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
        states.go("validity");
    },
    function (path) {
        console.log("device invalid");

        util.setValidity(false);
        states.go("validity");
    });


    // ===================== ON READY =====================

    angular.element($document).ready(function () {
        con.register($("#consoleContainer"));
        con.attach();
    });

}])