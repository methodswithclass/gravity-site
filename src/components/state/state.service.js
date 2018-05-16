stateModule.factory("state.service", ['$q', 'state.provider', '$state', '$rootScope', '$window', 'data.service', 'send', 'events', 'global', 'calibrate.service', 'manager.service', '$transitions', function ($q, stateProvider, $state, $rootScope, $window, data, send, events, g, calibrate, manager, $transitions) {

	var modalTime = 1000;

	var body = {};
	var elements = {};
	var objects = {};
	var bodyElem;
	var elem;

	var pso; //prevState

	var states = stateProvider.states;

	var state;
	var isPage = false;


	var setupReceivers = function () {

		console.log("setup state receivers", send);

		send.setup.receiver({name:"body", receiver:body});
		send.setup.receiver({name:"pages", receiver:elements});
		send.setup.receiver({name:"objects", receiver:objects});
		
	}

	var go = function (state) {

		console.log("go to state", state);

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


		setTimeout(function () {

			console.log("move page", input.name);

			manager.enterInstance(input.name);

			elem = $(elements["page" + input.name]);
			bodyElem = $(body["body"]);

			// bodyElem.removeClass("cutoff").addClass("scroll");

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

	$transitions.onStart({}, function(trans)
	{

		var fso = getStateParams(trans.$from().name);
		var tso = getStateParams(trans.$to().name);

		console.log(" ");
		console.log("#######################################")
		console.log("START state change from", fso.name.toUpperCase(), "to", tso.name.toUpperCase());

		pso = fso;

        if (fso.page) {

			var fp = data.getPageById(fso.name);
	   		manager.stopInstance(fp.id);
	   		manager.leaveInstance(fp.id);

	   	}
	   	else {
	   		//console.log("from state", fso.name, "is not a page");
	   	}

	});

	$transitions.onSuccess({}, function(trans)
    {

		var fso = getStateParams(trans.$from().name);
		var tso = getStateParams(trans.$to().name);
		
	   	if (tso.page) {


	   		var delay = 0;

	   		if (tso.name == "calibrate" && fso.name != "home") {
	   			delay = 1000;
	   		}

	   		movePage({
                name:tso.name,
                delay:delay,
                duration:100,
                complete:function (input) {
                    
                    console.log("END state change WITH MOVE from", fso.name.toUpperCase(), "to", tso.name.toUpperCase());
					console.log("#######################################");
					console.log(" ");
                    
                    // setTimeout(function () {

                    // 	// input.body.removeClass("scroll").addClass("cutoffX cutoffY");
                    // }, 500)

                    if (tso.name == "calibrate") input.manager.startInstance(tso.name);
                }
            });

	   	}
	   	else {
	   		console.log("END state change WITHOUT MOVE from", fso.name.toUpperCase(), "to", tso.name.toUpperCase());
			console.log("#######################################");
			console.log(" ");
	   	}

	});
	
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