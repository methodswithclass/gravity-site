stateModule.provider("state.provider", function ($stateProvider) {
  // runtime dependencies for the service can be injected here, at the provider.$get() function.

    var provider = {};


    var states = [
    {
        name:"modal",
        views:{
            "modal":{
                templateUrl:"assets/views/modal.html"
            }
        },
        abstract:true
    },
    {
        name:"modal.valid",
        url:"/valid",
        views:{
            "modal":{
                templateUrl:"assets/views/modal.valid.html",
                controller:"valid.controller"
            }
        },
        
    },
    {
        name:"modal.invalid",
        url:"/invalid",
        views:{
            "modal":{
                templateUrl:"assets/views/modal.invalid.html"
            }
        },
        
    },
    {
        name:"checking",
        url:"/checking",
        templateUrl:'assets/views/checking.view.html',
        controller:"checking.controller",
        controllerAs:"main"
    },
    {
        name:"page",
        url:"",
        templateUrl:"assets/views/content.view.html",
        controller:"page.controller",
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
        name:"page.demo",
        url:"/demo"
    },
    {
        name:"page.slide",
        url:"/slide"
    },
    {
        name:"page.enemy",
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