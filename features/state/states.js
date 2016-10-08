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
			isPage:so.page
		};
	}

	var movePage = function (input) {
		
		manager.enterInstance(input.name);

		elem = $(elements["page" + input.name]);
		bodyElem = $(body["body"]);

		console.log("move", bodyElem[0], "to element", elem[0]);

		bodyElem.removeClass("cutoff").addClass("scroll");

		bodyElem.scrollTo(elem[0], {
			duration:input.duration,
			queue:false,
			onAfter:function() {

				if (input.complete) input.complete(bodyElem, manager);
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

	events.on("enter-page", function () {


	});

	$rootScope.$on('$stateChangeStart', function(event, ts/*toState*/, tp/*toParams*/, fs/*fromState*/, fp/*fromParams*/)
	{

		console.log("start state change", "from state", fs.name, "to state", ts.name);

		ps = fs;

		var fso = getStateParams(fs.name);

		console.log("check if 'fromState' is a page");
		if (fso.page) {

			console.log(fso.name, "is a page");

			var fp = data.getPageById(fso.name);
	   		manager.stopInstance(fp.id);
	   		manager.leaveInstance(fp.id);

	   	}
	   	else {
	   		console.log(fso.name, "is not a page");
	   	}

	});

	$rootScope.$on('$stateChangeSuccess', function(event, ts/*toState*/, tp/*toParams*/, fs/*fromState*/, fp/*fromParams*/)
	{

		console.log("complete state change", "from state", fs.name, "to state", ts.name);

		//var fso = getStateParams(fs.name);
		var tso = getStateParams(ts.name);

	   	console.log("check if 'toState' is a page");
	   	if (tso.page) {

	   		console.log(tso.name, "is a page");
	 
	 //   		isPage = true;

	 //   		var tp = data.getPageById(tso.name);

	 //   		if (fso.page) {

	 //   			durr = 300;
	 //   			delay = 0;
	 //   		}
	 //   		else {
	 //   			durr = 0;
	 //   			delay = 2000;
	 //   		}

	 //   		setTimeout(function () {

	 //   			movePage({
	 //   				name:tp.id,
	 //   				duration:durr, 
	 //   				complete:function (body) {

		// 				console.log("move complete");

		// 				body.removeClass("scroll").addClass("cutoff");

		// 				manager.startInstance(tp.id);
		// 			}
		// 		});

	 //   		}, delay);

			

	   	}
	   	else {
	   		console.log(tso.name, "is not a page");
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