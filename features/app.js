var app = angular.module('nuplae', ['sharedModule', 'consoleModule', 'nuplaeModule', 'accelModule', 'ngRoute']);

var desktopdebug = false;
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
      when(checking, {

      	templateUrl:'features/nuplae/checking.html'
      });
}).
run(function ($location, validate) {


    var isValid;
    $location.path(checking);

    if (!desktopdebug) {
      console.log("validate");
      isValid = validate.run();
    }
    else {
      isValid = validate.invalidate();
      //$location.path(checking);
    }

    isValid.then( 
    function (path) { //valid
      console.log(path);
      $location.path(path);
    },
    function (path) { //invalid
      console.log(path);
      $location.path(path);
    });

});