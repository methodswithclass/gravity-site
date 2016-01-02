stateModule.factory("states", ['$q', 'runtime.state', '$state', '$rootScope', 'data.service', 'send', 'events', 'global', '$location', function ($q, runtime, $state, $rootScope, data, send, events, g, $location) {

	var modalTime = 1000;

	var body = {};

	var prevState;

	var states = runtime.states;

	var state;

	var blogs = data.blogs;

	send.setup.receiver({name:"body", receiver:body});

	var setModalTime = function (_time) {

		modalTime = _time;
	}

	var getModalTime = function () {

		return modalTime;
	}

	var splitStateName = function (state) {

		var name = state.name.split(".");

		return {
			type:name[0],
			state:name[1]
		}

	}

	var onEnterModal = function () {

		var prevName = prevState.name;

    	if (prevName == "" || splitStateName(prevName).type == "Modal") {
    		prevName = states[0].name;
    	}

		var close = function () {

			$state.go(prevName);	
		}

		var timer = setTimeout(function () {
		  close();
		}, getModalTime());
	}

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams) {

			//console.log(toState);	  

			prevState = fromState;

			console.log(toState);
		}
	);

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
		showModal:showModal,
		current:current,
		go:go
	}




}]);