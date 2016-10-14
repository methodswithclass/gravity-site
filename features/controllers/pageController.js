controllerModule.controller("PageController", ['$scope', 'data.service', 'utility', 'states', 'events', 'manager', 'settings.service', function ($scope, data, util, states, events, manager, settings) {

    var self = this;

    // ===================== DATA ======================

    //self.valid = false;
    self.pages = data.pages;

    var state = states.current();


    //console.log("page controller", state.state, "state is a page");
    
    // ===================== SETUP ======================

    states.setupReceivers();
    manager.setupReceivers();

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

    // ===================== EVENTS ===================== 

    events.on("gohome", function () {
        states.go("page.home");
    });

}])