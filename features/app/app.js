var app = angular.module('nuplae', ['sharedModule', 'validateModule', 'nuplaeModule', 'consoleModule', 'accelModule', 'ngRoute', 'ui.router']);

var checking = "/checking";
var invalid = "/invalid";
var valid = "/valid";


app.config(['$routeProvider', '$stateProvider', function (routeProvider, stateProvider, location) {

  console.log("define routes");

    nuplaeModule.stateProvider = stateProvider;

    routeProvider.
        when(invalid, {
    
          templateUrl: 'features/nuplae/invalid.html'
        }).
        when(valid, {
        
          templateUrl: 'features/nuplae/valid.html',
        }).
        when(checking, {

          templateUrl:'features/nuplae/checking.html',
        });
}]).run(function ($location) {

    console.log("location checking");

    $location.path(checking);
});