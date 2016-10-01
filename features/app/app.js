var app = angular.module('gravity', ['sharedModule', 'stateModule', 'uiModule', 'utility.module', 'ngRoute', 'ui.router']);

app.config(['runtime.stateProvider', '$locationProvider', function (runtimeProvider, $locationProvider) {
  
	console.log("config", "define states");

	$locationProvider.html5Mode(true);

	var states = runtimeProvider.states;

	for (var i = 0; i < states.length; i++) {
		runtimeProvider.addState(states[i]);
	}

}]).run(function (states, utility) {

    utility.toggleValidity(true);
    
    console.log("go to checking");
    states.go("checking");
});