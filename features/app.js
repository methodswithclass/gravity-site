var app = angular.module('nuplae', ['sharedModule', 'consoleModule', 'nuplaeModule', 'accelModule', 'ngRoute']);

var checking = "/checking";
var invalid = "/invalid";
var valid = "/valid";

app.config(function($routeProvider) {
    $routeProvider.

      when(invalid, {
      
        templateUrl: 'features/nuplae/invalid.html'

      }).
      when(valid, {
      
        templateUrl: 'features/nuplae/valid.html',
        controller:'nuplaeCtrl',
        controllerAs:'main'
      }).
      otherwise(checking, {

      	templateUrl:'features/nuplae/checking.html'
      });
});