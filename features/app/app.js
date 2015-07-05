var app = angular.module('nuplae', ['sharedModule', 'nuplaeModule', 'consoleModule', 'accelModule', 'ngRoute', 'ui.router']);

app.run(function ($location, routeService, stateManager) {

    routeService.setup();

    stateService.setup();

    $location.path(checking);

    routeService.validate();
});