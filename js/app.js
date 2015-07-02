var app = angular.module("nuplae", ['ngRoute']);

var mobiledebug = false;



app.config(function($routeProvider) {
    $routeProvider.
      //Display desktop version
      when('/invalid', {
        //Template for Desktop based browsers
        templateUrl: 'views/invalid.html'
      }).
      //Display mobile version
      when('/valid', {
        //Template for Mobile based browsers
        templateUrl: 'views/valid.html'
      }).otherwise("/");
}).
run(function (validate) {

	validate.run();

});