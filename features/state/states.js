stateModule.factory("states", ['$q', 'runtime.state', '$state', '$rootScope', 'data.service', 'send', 'events', 'global', 'calibrate.service', 'manager', function ($q, runtime, $state, $rootScope, data, send, events, g, calibrate, manager) {

	var modalTime = 1000;
	var duration = 300;

	var body = {};
	var elements = {};
	var objects = {};
	var bodyElem;
	var elem;

	var prevState;

	var states = runtime.states;

	var state;

	send.setup.receiver({name:"body", receiver:body});

	var setModalTime = function (_time) {

		modalTime = _time;
	}

	var getModalTime = function () {

		return modalTime;
	}

	var splitStateName = function (name) {

		var name = name.split(".");

		return {
			type:name[0],
			name:name[1]
		}

	}

	var navigate = function (name, _complete) {

		var complete = function () {};

		if (_complete) complete = _complete;

		elem = $(elements["page" + name]);
		bodyElem = $(body["body"]);

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

		var fromStateName = splitStateName(fromState.name);
		var toStateName = splitStateName(toState.name);

		//console.log(toState.name + " " + toStateName.type + " " + toStateName.name);

	   	if (fromStateName.type == "page" && toStateName.type == "page") {

	   		var fromPage = data.getPageById(fromStateName.name);
			var toPage = data.getPageById(toStateName.name);

	   		if (fromPage.motion) {
	   			manager.stopInstance(fromPage.id);
	   			manager.leaveInstance(fromPage.id);
	   		}
	   		if (toPage.motion) {
	   			manager.enterInstance(toPage.id);
	   		}

    		bodyElem = $(body["body"]);

			bodyElem.removeClass("cutoff").addClass("scroll");

			navigate(toPage.id, function () {

				console.log("nav complete");

				bodyElem.removeClass("scroll").addClass("cutoff");

				if (toPage.id == "calibrate") {
					calibrate.start();
				}

			});

	   	}

	});

	var define = function () {

		send.setup.receiver({name:"body", receiver:body});
		send.setup.receiver({name:"pages", receiver:elements});
		send.setup.receiver({name:"objects", receiver:objects});

		console.log("setup state receivers");
	}

	var showModal = function (params) {

		//console.log("show modal " + params.modal);

		setModalTime(params.time);

		$state.go("Modal." + params.modal);
	}

	var current = function () {

		return $state.current.name;
	}

	var go = function (state) {

		$state.go(state);
		
	}
	

	return {
		define:define,
		showModal:showModal,
		current:current,
		go:go
	}




}]);