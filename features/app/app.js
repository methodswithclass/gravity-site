var app = angular.module('nuplae', ['sharedModule', 'stateModule', 'uiModule', 'consoleModule', 'ngRoute', 'ui.router']);

app.config(['runtime.stateProvider', '$locationProvider', function (runtimeProvider, $locationProvider) {
  
  console.log("define states");

  $locationProvider.html5Mode(true);

  var states = runtimeProvider.states;

  for (var i = 0; i < states.length; i++) {
    runtimeProvider.addState(states[i]);
  }

}]).run(function (states) {

    console.log("go to checking");

    states.go("checking");
});