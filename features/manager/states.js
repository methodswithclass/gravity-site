managerModule.factory("states", ['$state', 'navigation', function ($state, nav) {

	var self = this;

	this.currentIndex = 0;

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



	var define = function () {

		console.log("define states");

		managerModule.stateProvider.state("Default", {}).
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
	             
	             console.log("show modal valid");

	        },
	        onExit:function() {
	              
	        	 console.log("close modal valid");
	        },
	      }).
	      state({
	      	name:"Page",
	      	onEnter:function() {
	              
	            nav.open(self.currentIndex, 500);

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

		$state.go("Modal." + modal);
	}

	var gotoPage = function (index) {

		self.currentIndex = index;

		$state.go(states[index].state);

	}

	return {
		define:define,
		gotoPage:gotoPage,
		showModal:showModal
	}




}]);