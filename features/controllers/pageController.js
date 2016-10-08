controllerModule.controller("PageController", ['$scope', 'data.service', 'utility', 'states', 'events', 'manager', function ($scope, data, util, states, events, manager) {

    var self = this;

    // ===================== DATA ======================


    self.valid = false;
    self.pages = data.pages;

    var state = states.current();

    console.log("page controller", state.state);

    if (state.page) {

        console.log("page controller", state.state, "state is page");

        //self.page = data.getPageById(state.name);

        // setTimeout(function() {

        //     states.movePage({
        //         name:self.page.id,
        //         duration:300,
        //         complete:function (input) {
        //             console.log("move complete");
        //             input.body.removeClass("scroll").addClass("cutoff");
        //             input.manager.startInstance(self.page.id);
        //         }
        //     });

        // }, 1000);
        

        // ===================== SETUP ======================

        states.setupReceivers();
        manager.setupReceivers();

    }
    else {

        console.log("page controller", state.state, "state is not page");

        if (util.isValid()) {
            //states.go("modal.valid");
            self.valid = true;
        }

        setTimeout(function () {

            states.go("page.calibrate");
        }, 2000);

        // else {
        //     states.go("modal.invalid");
        // }

    }

    // ===================== EVENTS ===================== 

    events.on("gohome", function () {
        states.go("page.home");
    });

}])