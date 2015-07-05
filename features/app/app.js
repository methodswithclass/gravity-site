var app = angular.module('nuplae', ['sharedModule', 'nuplaeModule', 'consoleModule', 'accelModule', 'ngRoute', 'ui.router']);

var checking = "/checking";
var invalid = "/invalid";
var valid = "/valid";

app.config(function ($route) {


});

app.run(function ($location, routeService, stateManager) {

    routeService.setup();

    stateService.setup();

    $location.path(checking);

    routeService.validate();
});