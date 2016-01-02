stateModule.provider("runtime.state", function ($stateProvider) {
  // runtime dependencies for the service can be injected here, at the provider.$get() function.

    var provider = {};

    var contactController = function () {

        return ['$scope', 'global', '$stateParams', 'data.service', function ($scope, g, $stateParams, data) {

            $scope.bio = data.bio;

            $scope.getContentUrl = function() {
            
                var view;

                if (g.isMobile()) {

                    view = "m.contact.html";
                }
                else {
                    view = "d.contact.html";
                }

                return 'features/views/' + view;
            }

            $scope.email = function () {

                window.location.href = 'mailto:chris@methodswithclass.com';
            }

        }];
    }

    var states = [
    {
        name:"Default"
    },
    {
        name:"Modal", 
        views:{
          "modal": {
            templateUrl: "features/views/modal/modal.html"
          }
        },
        onEnter: function() {
            
        onEnterModal();

        },
        onExit:function () {

        console.log("close modal");
        },
        abstract:true
    },
    {
        name:"Modal.valid",
        views:{
          "modal": {
            templateUrl: "features/views/modal/valid-modal.html"
          }
        }
    },
    {
        name:"Modal.invalid",
        views:{
            "modal": {
              templateUrl:"features/views/modal/invalid-modal.html"
            }
        }
    },
    {
        name:"home",
        url:"/home",
        template:"<div ng-include='getContentUrl()'></div>"
    },
    {
        name:"contact",
        url:"/contact",
        template:"<div ng-include='getContentUrl()'></div>",
        controller:contactController()
    },
    {
        name:"credits",
        url:"/credits",
        templateUrl:'features/views/d.credits.html'
    }
    ];

    var addState = function(state) { 

        console.log("add state " + state.name);

        $stateProvider.state(state);
    }

    provider.$get = ['send', '$location', 'data.service', 'global', '$state', function (send, $location, data, g, $state) {

      //console.log("get add state factory");

        var blogs = data.blogs;

        var service = function () {

            // console.log("create add state service");

            this.states = states;

            this.addState = addState;


            this.checkInbound = function() {

                console.log("check inbound");

                $state.go("home");
            }


        }

        return new service();
    
    }];

    provider.addState = addState;
    provider.states = states;

    return provider;
});