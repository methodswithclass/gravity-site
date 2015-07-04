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
      state("Modal", {
          views:{
              "modal": {
                  templateUrl: "modals/modal.html"
              }
          },
          onEnter: ["$state", function($state) {
              
              var close = function () {

                 $state.go("Default");
              }

              var mc = new Hammer(document);

              mc.on("tap", function (e) {
                 close();
              });

              $(document).on("keyup", function(e) {
                  if(e.keyCode == 27) {
                    $(document).off("keyup");
                    close();
                  }
              });

          }],

          
          abstract: true
  
      }).
      state("Modal.validate", {
          views:{
              "modal": {
                  templateUrl: "nuplae/valid-modal.html"
              }
          }
        });

}).run(function ($location) {

  $location.path(checking);
});