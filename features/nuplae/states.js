nuplaeModule.factory("states", ['$document', '$state', '$rootScope', 'params', function ($document, $state, $rootScope, params) {

	var currentIndex = 0;
	var body;
	var complete;

	var doesNavigate = false;

	var states = [
	{
		state:"Page.Home"
	},
	{
		state:"Page.Calibrate"
	},
	{
		state:"Page.Gravity"
	},
	{
		state:"Page.Float"
	},
	{
		state:"Page.Enemies"
	},
	{
		state:"Page.Balance"
	},
	{
		state:"Page.Space"
	}
	];

	var setCurrent = function (_current) {

		currentIndex = _current;
	}

	var getCurrent = function () {

		return currentIndex;
	}


	var setNavigate = function (_navigate) {

		doesNavigate = _navigate;
	}

	var getNavigate = function () {

		return doesNavigate;
	}
	


	var navigate = function (index, duration, _complete) {

		var complete;

		if (_complete) {

			complete = _complete;
		}
		else {
			complete = function () {

			}
		}

		body = $document.find("#body");

		setCurrent(index);

		//var result = nuplaeService.parseInput(to);

		var name = params.pages[index].name;
		var elem = $document.find("#page" + name);

		//body.removeClass("cutoff").addClass("scroll");

		console.log("navigate to " + name);
		console.log(elem[0]);

		body.scrollTo(elem, {
			duration:duration,
			queue:false,
			onAfter:complete
		});
	}

	var openHome = function () {

		setNavigate(false);

		navigate(0, 10, function () {

			console.log("nav complete");

			$state.go(states[0].state);

			setNavigate(true);

		});

		
	}


	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){

		console.log(toState);	   	

	   	if (toState.name.split(".")[0] == "Page") {

	   		console.log("inside page");

	   		if (getNavigate()) {

	   			console.log("inside navigate");

	   			console.log("go to current index: " + getCurrent());    
	    		navigate(getCurrent(), 700);
			}
		}

	});

	var define = function () {

		console.log("define states");

		nuplaeModule.stateProvider.state("Default", {}).
	      state({
	        name:"Modal", 
	        views:{
	            "modal": {
	              templateUrl: "features/modal/modal.html"
	            }
	        },
	        onEnter: function() {
	              
	              var close = function () {

	                 $state.go("Default");
	              }

	              var timer = setTimeout(function () {
	                  close();
	              }, 1000);

	          },

	          
	          abstract: true
	  
	      }).
	      state({
	        name:"Modal.valid",
	        views:{
	            "modal": {
	              templateUrl: "features/nuplae/valid-modal.html"
	            }
	      	},
	      	onEnter:function() {

	        },
	        onExit:function() {
	              
	        	 console.log("close modal valid");
	        },
	      }).
	      state({
	      	name:"Page",
	      	onEnter:function() {

	      		

	        },
	        onExit:function() {

	        },

	        abstract:true
	      
	      }).
	      state({
	      	name:states[0].state,
	      	onEnter:function() {
	              
	        },
	        onExit:function() {

	        }
	      }).
	      state({
	      	name:states[1].state,
	      	onEnter:function() {
	              
	              console.log("enter state 1");

	        },
	        onExit:function() {
	        	
	        }
	      }).
	      state({
	      	name:states[2].state,
	      	onEnter:function() {
	              

	        },
	        onExit:function() {
	        	
	        }
	      }).
	      state({
	      	name:states[3].state,
	      	onEnter:function() {
	              

	        },
	        onExit:function() {
	        	
	        }
	      }).
	      state({
	      	name:states[4].state,
	      	onEnter:function() {
	              

	        },
	        onExit:function() {
	        	
	        }
	      }).
	      state({
	      	name:states[5].state,
	      	onEnter:function() {
	              

	        },
	        onExit:function() {
	        	
	        }
	      }).
	      state({
	      	name:states[6].state,
	      	onEnter:function() {
	             


	        },
	        onExit:function() {
	        	

	        }
	      });

	}

	var showModal = function (modal) {

		console.log("show modal " + modal);

		$state.go("Modal." + modal);
	}

	var gotoPage = function (index) {

		console.log("go to state " + index);

		setCurrent(index);

		$state.go(states[index].state);

	}

	return {
		define:define,
		gotoPage:gotoPage,
		showModal:showModal,
		openHome:openHome
	}




}]);