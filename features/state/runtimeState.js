stateModule.provider("runtime.state", function ($stateProvider) {
  // runtime dependencies for the service can be injected here, at the provider.$get() function.

    var provider = {};


    var states = [
    {
        name:"checking",
        url:"/checking",
        template:"<div ng-include='getContentUrl()'></div>",
        controller:['$scope', 'validate.service', 'states', function ($scope, checkDevice, states) {

            console.log("checking controller");

            $scope.getContentUrl = function() {
            
                var view = "checking.html";

                return 'features/views/' + view;
            }

            var result = checkDevice.run();

            setTimeout(function () {

                result.then( 
                function (path) { //valid
                    //console.log("change location to " + path);
                    console.log("device valid");
                    states.go("page.calibrate");
                },
                function (path) { //invalid
                    //console.log("change location to " + path);
                    states.go("invalid");
                });

            }, 1000);

            

        }]
    },
    {
        name:"invalid",
        url:"/invalid",
        template:"<div ng-include='getContentUrl()'></div>",
        controller:['$scope', 'global', '$stateParams', 'data.service', function ($scope, g, $stateParams, data) {

            $scope.getContentUrl = function() {
            
                var view = "invalid.html";

                return 'features/views/' + view;
            }

        }]
    },
    {
        name:"page",
        url:"",
        templateUrl:"features/views/valid.html",
        controller:['$scope', '$document', 'data.service', 'states', 'events', 'con', 'manager', function ($scope, $document, data, states, events, con, manager) {

            console.log("open nuplae controller");

            var self = this;

            // ===================== DATA ======================

            self.pages = data.pages;

            // ===================== SETUP ======================

            states.define();
            manager.setupReceivers();

            // ===================== EVENTS ======================

            events.on("console", function () {

                //console.log("console event dispatch");

                return con.isRegistered();
            });

            // ===================== ON READY ======================

            angular.element($document).ready(function () {

                //console.log("document ready");

                con.register($("#consoleContainer"));

                con.attach();
            
            });

        }],
        controllerAs:"main",
        abstract:true
    },
    {
        name:"page.home",
        url:"/home"
    },
    {
        name:"page.calibrate",
        url:"/calibrate"
    },
    {
        name:"page.gravity",
        url:"/gravity"
    },
    {
        name:"page.float",
        url:"/float"
    },
    {
        name:"page.enemies",
        url:"/enemies"
    },
    {
        name:"page.balance",
        url:"/balance"
    },
    {
        name:"page.space",
        url:"/space"
    }
    ];

    var addState = function(state) { 

        console.log("add state " + state.name);

        $stateProvider.state(state);
    }

    provider.$get = function () {

      //console.log("get add state factory");

        var service = function () {

            // console.log("create add state service");

            this.states = states;


        }

        return new service();
    
    };

    provider.addState = addState;
    provider.states = states;

    return provider;
});