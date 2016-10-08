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

		games[page.id].onCreate({arena:input.parent, object:object, accel:accel});

		objects[input.id] = object;
		accels[input.id] = accel;
		arenas[input.id] = input.parent;
		hasMotion[input.id] = input.deviceinput;

	}

	var getInstance = function (id) {

		return {arena:arenas[id], object:objects[id], accel:accels[id]};
	}

	var enterInstance = function (id) {

		console.log("manager", "enter instance:", id);

		var page = data.getPageById(id);

		accels[id].reset();

		games[id].onEnter({arena:arenas[id]});

		if (page.game) {
			displays[id].time.html(games[id].clock());
			displays[id].points.html(games[id].points());
		}
	}

	var runGame = function (id) {

		console.log("manager", "run game:", id);

		var page = data.getPageById(id);
		var interval = page.params.interval;

		//console.log(page.id, interval)

		timer = setInterval(function () {

			accels[id].update();
			
			games[id].update(objects[id], interval);
			displays[id].time.html(games[id].clock());
			displays[id].points.html(games[id].points());

			if (games[id].zeroTime()) {
				stopInstance(id);
			}

		}, interval);

	}

	var stopGame = function (id) {

		console.log("manager", "stop game:", id);

		var page = data.getPageById(id);
		games[id].onEnd();
	}

	var leaveGame = function (id) {

		console.log("manager", "leave game:", id);

		var page = data.getPageById(id);
		games[id].onLeave();

	}

	var startInstance = function (id) {

		console.log("manager", "start instance:", id);

		var page = data.getPageById(id);

		if (id != "home") {

			accels[id].start();

			if (hasMotion[id]) window.ondevicemotion = accels[id].motion;

			toggles[id].play.addClass("hidden");
			toggles[id].stop.removeClass("hidden");
			games[id].onStart();
			if (page.game) runGame(id);
	
		}

	}

	var stopInstance = function (id, back) {

		console.log("manager", "stop instance:", id);

		var page = data.getPageById(id);

		if (id != "home") {

			clearInterval(timer);
			timer = null;

			accels[id].stop();

			window.ondevicemotion = null;

			toggles[id].play.removeClass("hidden");
			toggles[id].stop.addClass("hidden");

			stopGame(id, back);

		}
	}

	var resetInstance = function (id) {

		console.log("manager", "reset instance:", id);

		var page = data.getPageById(id);

		if (id != "home") {

			accels[id].reset();
			games[id].reset();
		
		}
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