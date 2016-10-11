stateModule.factory("states", ['$q', 'runtime.state', '$state', '$rootScope', 'data.service', 'send', 'events', 'global', 'calibrate.service', 'manager', '$window', function ($q, runtime, $state, $rootScope, data, send, events, g, calibrate, manager, $window) {

	var modalTime = 1000;

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

	var current = function () {

		var s = $state.current.name;
		var so = getStateParams(s);

		return {
			state:s,
			name:so.name,
			type:so.type,
			page:so.page
		};
	}

	var movePage = function (input) {
		
		//console.log("move to page", input.name, "delay", input.delay, "duration", input.duration);

		setTimeout(function () {

			manager.enterInstance(input.name);

			elem = $(elements["page" + input.name]);
			bodyElem = $(body["body"]);

			//console.log("move", bodyElem[0], "to element", elem[0]);

			bodyElem.removeClass("cutoff").addClass("scroll");

			bodyElem.scrollTo(elem[0], {
				duration:input.duration,
				queue:false,
				onAfter:function() {

					if (input.complete) input.complete({body:bodyElem, manager:manager});
				}
			});

		}, input.delay);

		
	}

	var resize = function () {

		var name = current().name;

		elem = $(elements["page" + name]);
		bodyElem = $(body["body"]);

		if (elem[0]) {
			bodyElem.scrollTo(elem[0]);
		}

	}

	$rootScope.$on('$stateChangeStart', function(event, ts/*toState*/, tp/*toParams*/, fs/*fromState*/, fp/*fromParams*/)
	{

		console.log("start state change", "from state", fs.name, "to state", ts.name);

		ps = fs;

		var fso = getStateParams(fs.name);

		if (fso.page) {

			console.log("from state", fso.name, "is a page");

			var fp = data.getPageById(fso.name);
	   		manager.stopInstance(fp.id);
	   		manager.leaveInstance(fp.id);

	   	}
	   	else {
	   		console.log("from state", fso.name, "is not a page");
	   	}

	});

	$rootScope.$on('$stateChangeSuccess', function(event, ts/*toState*/, tp/*toParams*/, fs/*fromState*/, fp/*fromParams*/)
	{

		console.log("complete state change", "from state", fs.name, "to state", ts.name);

		var fso = getStateParams(fs.name);
		var tso = getStateParams(ts.name);
		
	   	if (tso.page) {

	   		console.log("to state", tso.name, "is a page");

	   		var delay = 0;

	   		if (tso.name == "calibrate" && fso.name != "home") {
	   			delay = 1000;
	   		}

	   		movePage({
                name:tso.name,
                delay:delay,
                duration:100,
                complete:function (input) {
                    console.log("move complete");
                    input.body.removeClass("scroll").addClass("cutoff");
                    if (tso.name == "calibrate") input.manager.startInstance(tso.name);
                }
            });

	   	}
	   	else {
	   		console.log("to state", tso.name, "is not a page");
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
		go:go,
		movePage:movePage
	}




}]);