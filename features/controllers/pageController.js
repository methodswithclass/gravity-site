controllerModule.controller("PageController", ['$scope', '$document', 'data.service', 'states', 'events', 'manager', function ($scope, $document, data, states, events, manager) {

    console.log("page controller");

    var self = this;

    // ===================== DATA ======================

    self.pages = data.pages;

    var body;

    // ===================== SETUP ======================

    states.define();
    manager.setupReceivers();

    // ===================== EVENTS ======================

    events.on("gohome", function () {
        states.go("page.home");
    });

    // ===================== ON READY =====================

}])