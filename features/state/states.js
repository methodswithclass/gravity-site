stateModule.factory("states", ['$q', 'runtime.state', '$state', '$rootScope', 'data.service', 'send', 'events', 'global', 'calibrate.service', 'manager', '$window', function ($q, runtime, $state, $rootScope, data, send, events, g, calibrate, manager, $window) {

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

	var current = function () {

		return $state.current.name;
	}

	var go = function (state) {

		$state.go(state);
		
	}

	var splitStateName = function (name) {

		var name = name.split(".");

		var results = {};

		if (name.length > 1) {
			results = {
				type:name[0],
				name:name[1]
			}
		}
		else {
			results = {
				type:"",
				name:name[0]
			}
		}

		return results;

	}

	var navigate = function (name, _complete) {
		
		elem = $(elements["page" + name]);
		bodyElem = $(body["body"]);

		bodyElem.scrollTo(elem[0], {
			duration:duration,
			queue:false,
			onAfter:function() {

				if (_complete) _complete();
			}
		});
	}

	var resize = function () {

		var name = (splitStateName(current())).name;

		elem = $(elements["page" + name]);
		bodyElem = $(body["body"]);

		if (elem[0]) {
			bodyElem.scrollTo(elem[0]);
		}

	}

	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){


		//console.log(fromState);	
		//console.log(toState);  

		console.log("from state", fromState.name, "to state", toState.name);

		prevState = fromState;

		var fromStateName = splitStateName(fromState.name);
		var toStateName = splitStateName(toState.name);
		
		console.log("from", fromStateName, "to", toStateName);

		console.log("check if fromState is page");
		if (data.isPage(fromStateName.name)) {

			var fromPage = data.getPageById(fromStateName.name);
	   		if (fromPage.motion) {
	   			manager.stopInstance(fromPage.id);
	   			manager.leaveInstance(fromPage.id);
	   		}

	   	}

	   	console.log("check if toState is page");
	   	if (data.isPage(toStateName.name)) {

	   		var toPage = data.getPageById(toStateName.name);
	   		if (toPage.motion) {
	   			manager.enterInstance(toPage.id);
	   		}

	   		bodyElem = $(body["body"]);

			bodyElem.removeClass("cutoff").addClass("scroll");

			navigate(toPage.id, function () {

				console.log("nav complete");

				//bodyElem.removeClass("scroll").addClass("cutoff");

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
	
	angular.element($window).bind('resize', function () {
		resize();
	});

	return {
		define:define,
		current:current,
		go:go
	}




}]);