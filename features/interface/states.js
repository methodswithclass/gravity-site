uiModule.factory("states", ['$document', '$state', '$rootScope', 'data.service', 'send', 'manager', 'calibrate.service', 'events', function ($document, $state, $rootScope, data, send, manager, calibrate, events) {
	
	var complete;

	var modalTime = 1000;
	var duration = 300;

	var body = {};
	var elements = {};
	var objects = {};
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
	}
	];

	var setModalTime = function (_time) {

		modalTime = _time;
	}

	var getModalTime = function () {

		return modalTime;
	}


	var getIndex = function (stateName) {

		//console.log("check name:" + stateName);

		for (i in states) {

			if (stateName == states[i].state) {

				return i;
			}
		}

		return -1;
	}

	var splitStateName = function (state) {

		var nameArray;

		if (state.search(".") > -1) {
			nameArray = state.split(".");
		}
		else nameArray = [];

		var index = getIndex(state);

		return {
			type:nameArray[0],
			name:nameArray[1],
			index:index
		}

	}
	


	var navigate = function (name, _complete) {

		var complete;

		if (_complete) {

			complete = _complete;
		}
		else {
			complete = function () {

			}
		}

		elem = $(elements["page" + name]);
		bodyElem = $(body["body"]);

		bodyElem.scrollTo(elem[0], {
			duration:duration,
			queue:false,
			onAfter:complete
		});
	}

	var showModal = function (input) {

		console.log("show modal " + input.modal);

		setModalTime(input.time);

		$state.go("Modal." + input.modal);
	}

	var gotoPage = function (index) {

		console.log("go to state " + index);

		$state.go(states[index].state);

	}


	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){

		console.log(toState);	  

		prevState = fromState;

		var fromStateName = splitStateName(fromState.name);
		var toStateName = splitStateName(toState.name);

	   	if (toStateName.type == "Page") {

	   		var fromPage = data.getPageByName(fromStateName.name);
			var toPage = data.getPageByName(toStateName.name);

	   		if (fromPage.motion) {
	   			manager.stopInstance(fromPage.name);
	   			manager.leaveInstance(fromPage.name);
	   		}
	   		if (toPage.motion) {
	   			manager.enterInstance(toPage.name);
	   		}

    		bodyElem = $(body["body"]);

			bodyElem.removeClass("cutoff").addClass("scroll");

			navigate(toPage.name, function () {

				console.log("nav complete");

				bodyElem.removeClass("scroll").addClass("cutoff");

			});

	   	}

	});

	var define = function () {

		send.receiver({name:"body", receiver:body});

		send.receiver({name:"pages", receiver:elements});

		send.receiver({name:"objects", receiver:objects});

		console.log("define states");

		uiModule.stateProvider.state("Default", {}).
	      state({
	        name:"Modal", 
	        views:{
	            "modal": {
	              templateUrl: "features/interface/views/modal/modal.html"
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
	              templateUrl: "features/interface/views/modal/valid-modal.html"
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
	              templateUrl: "features/interface/views/modal/invalid-modal.html"
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

	      		calibrate.start();

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

	return {
		define:define,
		gotoPage:gotoPage,
		showModal:showModal
	}




}]);