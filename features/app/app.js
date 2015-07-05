var app = angular.module('nuplae', ['managerModule']);

var checking = "/checking";
var invalid = "/invalid";
var valid = "/valid";


app.config(function ($routeProvider) {

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
          controller:'managerCtrl'
        });
}).run(function ($location) {

    $location.path(checking);
});