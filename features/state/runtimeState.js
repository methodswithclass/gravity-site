stateModule.provider("runtime.state", function ($stateProvider) {
  // runtime dependencies for the service can be injected here, at the provider.$get() function.

    var provider = {};

    var checkingController = function () {

        return ['$scope', 'validate.service', 'states', function ($scope, checkDevice, states) {

            console.log("checking controller");

            $scope.getContentUrl = function() {
            
                var view = "checking.html";

                return 'features/views/' + view;
            }

            var result = checkDevice.run();

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

        }];
    }

    var invalidController = function () {

        return ['$scope', 'global', '$stateParams', 'data.service', function ($scope, g, $stateParams, data) {

            $scope.getContentUrl = function() {
            
                var view = "invalid.html";

                return 'features/views/' + view;
            }

        }];
    }

    var states = [
    {
        name:"Modal", 
        views:{
            "modal": {
              templateUrl: "features/interface/views/modal/modal.html"
            }
        },
        onEnter: function() {
              
            var prevName = prevState.name;

            if (prevName == "" || prevName.split(".")[0] == "Modal") {
                prevName = "home";
            }

            var close = function () {

                $state.go(prevName);    
            }

            //console.log(getModalTime());

            var timer = setTimeout(function () {
              close();
            }, getModalTime());

        },
        abstract: true

    },
    {
        name:"Modal.valid",
        views:{
            "modal": {
              templateUrl: "features/interface/views/modal/valid-modal.html"
            }
        },
        onEnter:function() {

        },
        onExit:function() {
              
             console.log("close modal valid");
        }
    },
    {
        name:"Modal.invalid",
        views:{
            "modal": {
              templateUrl: "features/interface/views/modal/invalid-modal.html"
            }
        },
        onEnter:function() {

        },
        onExit:function() {
              
             console.log("close modal invalid");
        }
    },
    {
        name:"checking",
        url:"/checking",
        template:"<div ng-include='getContentUrl()'>checking</div>",
        controller:checkingController()
    },
    {
        name:"invalid",
        url:"/invalid",
        template:"<div ng-include='getContentUrl()'></div>",
        controller:invalidController()
    },
    {
        name:"page",
        url:"",
        template:"<div ng-include='getContentUrl()'></div>",
        controller:"nuplaeCtrl",
        controllerAs:"main",
        abstract:true
    },
    {
        name:"page.home",
        url:"/home",
        template:"<div ng-include='getContentUrl()'></div>"
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