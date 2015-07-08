nuplaeModule.factory("states", ['$document', '$state', '$rootScope', 'params', 'send', function ($document, $state, $rootScope, params, send) {
	
	var complete;

	var modalTime = 1000;
	var duration = 700;

	var openDuration = 700;
	var backDuration = 300;
	var initalDuration = 10;

	var body = {};
	var elements = {};
	var bodyElem;
	var elem;

	var prevState;

	var states = [
	{
		state:"Page.Home",
		index:0
	},
	{
		state:"Page.Calibrate",
		index:1
	},
	{
		state:"Page.Gravity",
		index:2
	},
	{
		state:"Page.Float",
		index:3
	},
	{
		state:"Page.Enemies",
		index:4
	},
	{
		state:"Page.Balance",
		index:5
	},
	{
		state:"Page.Space",
		index:6
	},
	{
		state:"Page.Initial",
		index:0
	}
	];

	var setDuration = function (_duration) {
		duration = _duration;
	}

	var setModalTime = function (_time) {

		modalTime = _time;
	}

	var getModalTime = function () {

		return modalTime;
	}


	var getIndex = function (stateName) {

		console.log("check name:" + stateName);

		for (i in states) {

			if (stateName == states[i].state) {

				return i;
			}
		}

		return -1;
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

		index = index >= params.pages.length ? 0 : index;

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


	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){

		console.log(toState);	  

		prevState = fromState; 

		console.log(prevState);

		var stateName = toState.name.split(".");

	   	if (stateName[0] == "Page") {

   			var index = getIndex(toState.name);

   			if (index == -1) {
   				console.log("state not found");
   			}
   			else {

   				if (index == 7) {
   					setDuration(initialDuration);
   				}
   				else if (index == 0) {
   					setDuration(backDuration);
   				}
   				else {
   					setDuration(openDuration);
   				}

	    		bodyElem = $(body["body"]);

				bodyElem.removeClass("cutoff").addClass("scroll");

				navigate(index, duration, function () {

					console.log("nav complete");

					bodyElem.removeClass("scroll").addClass("cutoff");

				});

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
	      }).
	      state({
	      	name:states[7].state,
	      	onEnter:function() {
	              
	        },
	        onExit:function() {

	        }
	      });

	}

	var openInitial = function () {

		bodyElem = $(body["body"]);

		bodyElem.removeClass("cutoff").addClass("scroll");

		navigate(7, 10, function () {

			console.log("nav complete");

			bodyElem.removeClass("scroll").addClass("cutoff");

			showModal({modal:"valid", time:1500});

		});
	}

	var showModal = function (params) {

		console.log("show modal " + params.modal);

		setModalTime(params.time);

		$state.go("Modal." + params.modal);
	}

	var gotoPage = function (index) {

		console.log("go to state " + index);

		$state.go(states[index].state);

	}

	return {
		define:define,
		gotoPage:gotoPage,
		showModal:showModal,
		openHome:openInitial
	}




}]);