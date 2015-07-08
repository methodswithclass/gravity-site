nuplaeModule.factory("states", ['$document', '$state', '$rootScope', 'params', 'send', function ($document, $state, $rootScope, params, send) {

	var currentIndex = 0;
	
	var complete;

	var doesNavigate = false;

	var modalTime = 1000;

	var body = {};
	var elements = {};
	var bodyElem;
	var elem;

	var prevState;

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

	var setModalTime = function (_time) {

		modalTime = _time;
	}

	var getModalTime = function () {

		return modalTime;
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

		setCurrent(index);
		var name = params.pages[index].name;
		var id = "page" + name;

		elem = $(elements[id]);
		bodyElem = $(body["body"]);

		console.log("navigate to " + name);
		console.log(elem[0]);
		console.log(bodyElem[0]);

		bodyElem.scrollTo(elem[0], {
			duration:duration,
			queue:false,
			onAfter:complete
		});
	}

	var openHome = function () {

		bodyElem = $(body["body"]);

		bodyElem.removeClass("cutoff").addClass("scroll");

		navigate(0, 10, function () {

			console.log("nav complete");

			bodyElem.removeClass("scroll").addClass("cutoff");

			showModal({modal:"valid", time:1500});

		});

		
	}


	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){

		console.log(toState);	  

		prevState = fromState; 

		console.log(prevState);

	   	if (toState.name.split(".")[0] == "Page") {

	   		console.log("inside page, navigate: " + getNavigate());

	   		if (getNavigate()) {

	   			console.log("inside navigation");

	   			console.log("go to current index: " + getCurrent());    
	    		

	    		bodyElem = $(body["body"]);

				bodyElem.removeClass("cutoff").addClass("scroll");

				navigate(getCurrent(), 700, function () {

					console.log("nav complete");

					bodyElem.removeClass("scroll").addClass("cutoff");

				});
			}
			else {
				setNavigate(true);
			}
		}

	});

	var define = function () {

		send.receiver({name:"body", receiver:body});

		send.receiver({name:"pages", receiver:elements});

		console.log("define states");

		nuplaeModule.stateProvider.state("Default", {}).
	      state({
	        name:"Modal", 
	        views:{
	            "modal": {
	              templateUrl: "features/nuplae/views/modal/modal.html"
	            }
	        },
	        onEnter: function() {
	              
	        	var prevName = prevState.name;

	        	if (prevName == "" || prevName.split(".")[0] == "Modal") {
	        		prevName = states[0].state;
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
	  
	      }).
	      state({
	        name:"Modal.valid",
	        views:{
	            "modal": {
	              templateUrl: "features/nuplae/views/modal/valid-modal.html"
	            }
	      	},
	      	onEnter:function() {

	        },
	        onExit:function() {
	              
	        	 console.log("close modal valid");

	        	 //setNavigate(false);

	        	 //$state.go(states[0].state);
	        },
	      }).
	      state({
	        name:"Modal.invalid",
	        views:{
	            "modal": {
	              templateUrl: "features/nuplae/views/modal/invalid-modal.html"
	            }
	      	},
	      	onEnter:function() {

	        },
	        onExit:function() {
	              
	        	 console.log("close modal invalid");
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

	var showModal = function (params) {

		console.log("show modal " + params.modal);

		setModalTime(params.time);

		$state.go("Modal." + params.modal);
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