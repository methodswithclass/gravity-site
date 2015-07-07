nuplaeModule.factory("states", ['$state', '$rootScope', 'params', function ($state, $rootScope, params) {

	var self = this;

	this.currentIndex = 0;
	var body;

	this.doesNavigate = false;

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

	


	var navigate = function (index, duration, complete) {

		body = $("#body");

		setCurrent(index);

		

		//var result = nuplaeService.parseInput(to);

		var name = params.pages[index].name;

		console.log("navigate to " + name);
		var elem = $("#page" + name);

		body.removeClass("cutoff").addClass("scroll");

		body.scrollTo(elem, {
			duration:duration,
			queue:false,
			onAfter:function(target, settings) {
				body.removeClass("scroll").addClass("cutoff");
				if (complete) complete();
			}
		});
	}

	var openHome = function () {

		self.doesNavigate = false;

		navigate(0, 10, function () {

			$state.go(states[0].state);

			self.doesNavigate = true;

		});

		
	}


	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){

		console.log(toState);	   	

	   	if (toState.name.split(".")[0] == "Page") {

	   		if (self.doesNavigate) {

	   			console.log("go to current index: " + self.currentIndex);    
	    		navigate(self.currentIndex, 700);
			}
		}

	});


	var setCurrent = function (current) {

		self.currentIndex = current;
	}

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