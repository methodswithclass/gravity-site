stateModule.factory("states", ['$q', 'runtime.state', '$state', '$rootScope', 'data.service', 'send', 'events', 'global', 'calibrate.service', 'manager', '$window', function ($q, runtime, $state, $rootScope, data, send, events, g, calibrate, manager, $window) {

	var modalTime = 1000;
	var duration = 300;

	var body = {};
	var elements = {};
	var objects = {};
	var bodyElem;
	var elem;

	var ps; //prevState

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

		console.log("nav", bodyElem[0], "to element", elem[0]);

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
	function(event, ts/*toState*/, tp/*toParams*/, fs/*fromState*/, fp/*fromParams*/){
		
		//console.log(fromState);	
		//console.log(toState);  

		console.log("from state", fs.name, "to state", ts.name);

		ps = fs;

		var fso = splitStateName(fs.name);
		var tso = splitStateName(ts.name);
		
		console.log("from", fso, "to", tso);

		console.log("check if 'fromState' is page");
		if (fso.type == "page") {

			console.log(fso.name, "is page");

			var fp = data.getPageById(fso.name);
	   		if (fp.motion) {
	   			manager.stopInstance(fp.id);
	   			manager.leaveInstance(fp.id);
	   		}

	   	}

	   	console.log("check if 'toState' is page");
	   	if (tso.type == "page") {

	   		console.log(tso.name, "is page");

	   		var tp = data.getPageById(tso.name);
	   		if (tp.motion) {
	   			manager.enterInstance(tp.id);
	   		}

	   		bodyElem = $(body["body"]);

			bodyElem.removeClass("cutoff").addClass("scroll");

			navigate(tp.id, function () {

				console.log("nav complete");

				//bodyElem.removeClass("scroll").addClass("cutoff");

				if (tp.id == "calibrate") {
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