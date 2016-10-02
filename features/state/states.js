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
	var isPage = false;

	send.setup.receiver({name:"body", receiver:body});

	var current = function () {

		return {
			name:$state.current.name,
			isPage:isPage
		};
	}

	var go = function (state) {

		$state.go(state);
		
	}

	var getStateParams = function (name) {

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

		results.page = results.type == "page";

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

		var name = (getStateParams(current())).name;

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

		var fso = getStateParams(fs.name);
		var tso = getStateParams(ts.name);
		
		console.log("from", fso, "to", tso);

		console.log("check if 'fromState' is page");
		if (fso.page) {

			console.log(fso.name, "is page");

			var fp = data.getPageById(fso.name);
	   		if (fp.motion) {
	   			manager.stopInstance(fp.id);
	   			manager.leaveInstance(fp.id);
	   		}

	   	}
	   	else {
	   		console.log(fso.name, "is not page");
	   	}

	   	console.log("check if 'toState' is page");
	   	if (tso.page) {

	   		console.log(tso.name, "is page");
	   		isPage = true;

	   		var tp = data.getPageById(tso.name);
	   		if (tp.motion) {
	   			manager.enterInstance(tp.id);
	   		}

	   		bodyElem = $(body["body"]);

			bodyElem.removeClass("cutoff").addClass("scroll");

			navigate(tp.id, function () {

				console.log("nav complete");

				bodyElem.removeClass("scroll").addClass("cutoff");

				if (tp.id == "calibrate") {
					calibrate.start();
				}

			});

	   	}
	   	else {
	   		console.log(tso.name, "is not page");
	   	}

	});

	var setupReceivers = function () {

		console.log("setup state receivers");

		send.setup.receiver({name:"body", receiver:body});
		send.setup.receiver({name:"pages", receiver:elements});
		send.setup.receiver({name:"objects", receiver:objects});

		
	}
	
	angular.element($window).bind('resize', function () {
		resize();
	});

	return {
		setupReceivers:setupReceivers,
		current:current,
		go:go
	}




}]);