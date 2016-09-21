controllerModule.controller("PageController", ['$scope', '$document', 'data.service', 'states', 'events', 'con', 'manager', function ($scope, $document, data, states, events, con, manager) {

    console.log("page controller");

    var self = this;

    // ===================== DATA ======================

    self.pages = data.pages;

    // ===================== SETUP ======================

    states.define();
    manager.setupReceivers();

    // ===================== EVENTS ======================

    events.on("console", function () {

        //console.log("console event dispatch");

        return con.isRegistered();
    });

    // ===================== ON READY ======================

    angular.element($document).ready(function () {

        //console.log("document ready");

        con.register($("#consoleContainer"));

        con.attach();
    
    });

}])