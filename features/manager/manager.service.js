managerModule.factory("manager", ["accelerometer", "object.service", "data.service", 'send', 'games.library', function (accelerometer, objectFact, data, send, games) {

	var object;
	var accel;

	var objects = {};
	var accels = {};
	var arenas = {};
	var displays = {};
	var hasMotion = {};
	var toggles = {};

	var timer;
	var interval;

	var setupReceivers = function () {

		console.log("manager setup receivers");

		send.setup.receiver({name:"toggle", receiver:toggles});
		send.setup.receiver({name:"display", receiver:displays});
	}

	var runGame = function (id) {

		console.log("manager", "run game:", id);

		var page = data.getPageById(id);
		var interval = page.params.interval;

		games[id].onStart();

		timer = setInterval(function () {

			//accels[id].update();
			
			games[id].update(objects[id], interval);
			
			if (page.keep) {
				displays[id].time.html(games[id].clock());
				displays[id].points.html(games[id].points());

				if (games[id].zeroTime()) {
					stopInstance(id);
				}
			}

		}, interval);

	}

	var stopGame = function (id) {

		console.log("manager", "stop game:", id);

		var page = data.getPageById(id);
		if (page.game) games[id].onEnd();
	}

	var leaveGame = function (id) {

		console.log("manager", "leave game:", id);

		var page = data.getPageById(id);
		if (page.game) games[id].onLeave();

	}

	var addInstance = function (input) {

		console.log("manager", "add instance:", input.id);

		var page = data.getPageById(input.id);

		object = new objectFact({
			id:input.id,
			object:input.object,
			arena:input.parent,
			params:page
		});
			
		accel = new accelerometer({
			id:input.id,
			params:page.params,
			object:object
		});

		accel.initialize({
			arena:input.parent
		});

		if (page.game) games[page.id].onCreate({arena:input.parent, object:object, accel:accel});

		objects[input.id] = object;
		accels[input.id] = accel;
		arenas[input.id] = input.parent;
		hasMotion[input.id] = input.deviceinput;

	}

	var enterInstance = function (id) {

		console.log("manager", "enter instance:", id);

		var page = data.getPageById(id);

		if (page.game) {
			accels[id].reset();
			games[id].onEnter({arena:arenas[id]});
		}

		if (page.keep) {
			displays[id].time.html(games[id].clock());
			displays[id].points.html(games[id].points());
		}
	}

	var startInstance = function (id) {

		console.log("manager", "start instance:", id);

		var page = data.getPageById(id);

		if (id != "home") {

			if (page.game) accels[id].start();

			if (hasMotion[id]) window.ondevicemotion = accels[id].motion;

			toggles[id].play.addClass("hidden");
			toggles[id].stop.removeClass("hidden"); 
			if (page.game) runGame(id);
	
		}

	}

	var stopInstance = function (id) {

		console.log("manager", "stop instance:", id);

		var page = data.getPageById(id);

		if (id != "home") {

			clearInterval(timer);
			timer = null;

			if (page.game) accels[id].stop();

			window.ondevicemotion = null;

			toggles[id].play.removeClass("hidden");
			toggles[id].stop.addClass("hidden");

			if (page.game) stopGame(id);

		}
	}

	var leaveInstance = function (id) {

		console.log("manager", "leave instance:", id);

		var page = data.getPageById(id);
		if (page.game) leaveGame(id);

	}

	var resetInstance = function (id) {

		console.log("manager", "reset instance:", id);

		var page = data.getPageById(id);

		if (id != "home") {

			accels[id].reset();
			games[id].reset();
		
		}
	}

	var getInstance = function (id) {

		return {arena:arenas[id], object:objects[id], accel:accels[id]};
	}

	return {
		setupReceivers:setupReceivers,
		addInstance:addInstance,
		getInstance:getInstance,
		enterInstance:enterInstance,
		startInstance:startInstance,
		stopInstance:stopInstance,
		leaveInstance:leaveGame,
		resetInstance:resetInstance
	}

}]);