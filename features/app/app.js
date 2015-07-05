var app = angular.module('nuplae', ['sharedModule', 'nuplaeModule', 'consoleModule', 'accelModule', 'ngRoute', 'ui.router']);

var checking = "/checking";
var invalid = "/invalid";
var valid = "/valid";

app.run(function ($location, routeService, stateManager) {

    $location.path(checking);

    routeService.validate();
});