stateModule.provider("runtime.state", function ($stateProvider) {
  // runtime dependencies for the service can be injected here, at the provider.$get() function.

    var provider = {};


    var states = [
    {
        name:"modal",
        views:{
            "modal":{
                templateUrl:"views/modal.html"
            }
        },
        abstract:true
    },
    {
        name:"modal.valid",
        url:"/valid",
        views:{
            "modal":{
                templateUrl:"views/modal.valid.html",
                controller:"ValidController"
            }
        },
        
    },
    {
        name:"modal.invalid",
        url:"/invalid",
        views:{
            "modal":{
                templateUrl:"views/modal.invalid.html"
            }
        },
        
    },
    {
        name:"checking",
        url:"/checking",
        template:"<div ng-include='getContentUrl()'></div>",
        controller:"CheckingController"
    },
    {
        name:"page",
        url:"",
        templateUrl:"views/content.html",
        controller:"PageController",
        controllerAs:"main",
        abstract:true
    },
    {
        name:"page.validity",
        url:"/validity"
    },
    {
        name:"page.home",
        url:"/home"
    },
    {
        name:"page.settings",
        url:"/settings"
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
        name:"page.slide",
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