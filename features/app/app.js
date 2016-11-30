var app = angular.module('gravity', ['sharedModule', 'stateModule', 'uiModule', 'utility.module', 'ngRoute', 'ui.router']);

app.config(['runtime.stateProvider', '$locationProvider', function (runtimeProvider, $locationProvider) {
  
	console.log("config", "define states");

	$locationProvider.html5Mode(true);

	var states = runtimeProvider.states;

	for (var i = 0; i < states.length; i++) {
		runtimeProvider.addState(states[i]);
	}

}]).run(function (states, utility) {

	//for desktop debugging when no accelerometer is present, comment out this line for production
    //utility.forceValidity(true);
    

    //1. check existence of device accelerometer
    console.log("go to checking");
    states.go("checking");

    //2. route to validController and display results of accelerometer check

    //3. route to next state (calibrate) if valid, stop progression through app if invalid

});