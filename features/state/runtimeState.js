stateModule.provider("runtime.state", function ($stateProvider) {
  // runtime dependencies for the service can be injected here, at the provider.$get() function.

    var provider = {};


    var states = [
    {
        name:"checking",
        url:"/checking",
        template:"<div ng-include='getContentUrl()'></div>",
        controller:"CheckingController"
    },
    {
        name:"invalid",
        url:"/invalid",
        template:"<div ng-include='getContentUrl()'></div>",
        controller:"InvalidController"
    },
    // {
    //     name:"settings",
    //     url:"/settings",
    //     templateUrl:"features/views/settings.html",
    //     controller:"SettingsController",
    //     controllerAs:"main"
    // },
    {
        name:"page",
        url:"",
        templateUrl:"features/views/valid.html",
        controller:"PageController",
        controllerAs:"main",
        abstract:true
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