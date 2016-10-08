controllerModule.controller("PageController", ['$scope', 'data.service', 'utility', 'states', 'events', 'manager', function ($scope, data, util, states, events, manager) {

    var self = this;

    // ===================== DATA ======================

    //self.valid = false;
    self.pages = data.pages;

    var state = states.current();

    if (state.page) {

        console.log("page controller", state.state, "state is a page");
        
        // ===================== SETUP ======================

        states.setupReceivers();
        manager.setupReceivers();


        // ===================== CALIBRATE ======================

        // if (state.name == "calibrate") {

        //     setTimeout(function () {
        //         manager.startInstance(state.name);
        //     }, 0);
        // }

    }
    else {

        console.log("page controller", state.state, "state is not a page");

        console.log(" ");
        if (util.isValid()) {
            console.log("########## is valid ############");
            //self.valid = true;

            setTimeout(function () {
                states.go("page.calibrate");
            }, 2000);
        }
        else {
            console.log("########## is invalid ############");
        }
        console.log(" ");

    }

    // ===================== EVENTS ===================== 

    events.on("gohome", function () {
        states.go("page.home");
    });

}])