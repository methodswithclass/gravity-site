controllerModule.controller("PageController", ['$scope', 'data.service', 'states', 'events', 'manager', function ($scope, data, states, events, manager) {

    console.log("page controller");

    var self = this;

    // ===================== DATA ======================

    self.pages = data.pages;

    var id = states.current().name

    self.page = data.getPageById(id);

    states.movePage({
        name:self.page.name,
        duration:300,
        complete:function (body, manager) {
            console.log("move complete");
            body.removeClass("scroll").addClass("cutoff");
            manager.startInstance(self.page.name);
        }
    });

    // ===================== SETUP ======================

    states.setupReceivers();
    manager.setupReceivers();

    // ===================== EVENTS ======================

    events.on("gohome", function () {
        states.go("page.home");
    });
    
    // ===================== ON READY =====================

}])