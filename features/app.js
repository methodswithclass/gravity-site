var app = angular.module('nuplae', ['sharedModule', 'consoleModule', 'nuplaeModule', 'accelModule', 'ngRoute', 'ui.router']);


var checking = "/checking";
var invalid = "/invalid";
var valid = "/valid";


app.config(function($routeProvider, $stateProvider) {
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

      	templateUrl:'features/nuplae/checking.html',
        controller:'consoleCtrl'
      });

    $stateProvider.state("Default", {}).
      state({
        name:"Modal", 
        views:{
            "modal": {
              templateUrl: "features/modal/modal.html"
            }
        },
        onEnter: ["$state", function($state) {
              
              var close = function () {

                 $state.go("Default");
              }

              var timer = setTimeout(function () {
                  close();
              }, 1500);

          }],

          
          abstract: true
  
      }).
      state({
        name:"Modal.valid",
        views:{
            "modal": {
              templateUrl: "features/nuplae/valid-modal.html"
            }
      }
      
      });

}).run(function ($location) {

  $location.path(checking);
});