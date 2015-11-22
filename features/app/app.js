var app = angular.module('nuplae', ['sharedModule', 'uiModule', 'consoleModule', 'ngRoute', 'ui.router']);

var checking = "/checking";
var invalid = "/invalid";
var valid = "/valid";


app.config(['$routeProvider', '$stateProvider', function (routeProvider, stateProvider, location) {

  console.log("define routes");

    uiModule.stateProvider = stateProvider;

    routeProvider.
        when(invalid, {
    
          templateUrl: 'features/interface/views/invalid.html'
        }).
        when(valid, {
        
          templateUrl: 'features/interface/views/valid.html',
        }).
        when(checking, {

          templateUrl:'features/interface/views/checking.html',
        });
}]).run(function ($location) {

    console.log("location checking");

    $location.path(checking);
});