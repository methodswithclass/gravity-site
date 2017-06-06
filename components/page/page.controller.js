controllerModule.controller("page.controller", ['$scope', 'data.service', 'utility.service', 'state.service', 'events.service', 'manager.service', 'settings.service', function ($scope, data, util, states, events, manager, settings) {

    var self = this;

    // ===================== DATA ======================

    self.pages = data.pages;

    var state = states.current();
    var page = $scope.page;


    // =================================================

    //console.log(" ");
    console.log("page controller", state.state);

    // ===================== SETUP ======================

    states.setupReceivers();
    manager.setupReceivers();

    // ===================== EVENTS ===================== 

    events.on("gohome", function () {
        states.go("page.home");
    });

}])