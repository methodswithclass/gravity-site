controllerModule.controller("PageController", ['$scope', 'data.service', 'states', 'events', 'manager', function ($scope, data, states, events, manager) {

    console.log("page controller");

    var self = this;

    // ===================== DATA ======================

    self.pages = data.pages;

    var body;

    // ===================== SETUP ======================

    states.setupReceivers();
    manager.setupReceivers();

    // ===================== EVENTS ======================

    events.on("gohome", function () {
        states.go("page.home");
    });

    events.on("enter-page", function () {

        states.navTo();
    })

    // ===================== ON READY =====================

}])