managerModule.factory("manager", ["accelerometer", "object.service", "data.service", 'send', 'games.library', function (accelerometer, objectFact, data, send, games) {

	var object;
	var accel;

	var objects = {};
	var accels = {};
	var arenas = {};
	var hasMotion = {};
	var toggles = {};

	var timer;
	var interval;

	var setupReceivers = function () {

		send.receiver({name:"toggle", receiver:toggles});
	}

	var addInstance = function (input) {

		console.log("create instance: " + input.name);

		var game = data.getPageByName(input.name);

		object = new objectFact({
			object:input.object,
			arena:input.parent,
			params:game
		});
			
		accel = new accelerometer({
			params:game.params,
			object:object
		});

		accel.initialize({
			arena:input.parent
		});

		// accel.getMotion(function (position, velocity, acceleration) {

		// 	object.setPosition(position);
		// 	object.setVelocity(velocity);
		// 	object.setAcceleration(acceleration);

		// });

		objects[input.name] = object;
		accels[input.name] = accel;
		arenas[input.name] = input.parent;
		hasMotion[input.name] = input.deviceinput;

	}

	var getInstance = function (name) {

		return {arena:arenas[name], object:objects[name], accel:accels[name]};
	}

	var initializeInstance = function (name) {

		var page = data.getPageByName(name);

		if (page.game) games[name].initialize({arena:arenas[name]});
	}

	var runGame = function (name) {

		var page = data.getPageByName(name);

		var interval = 1000*page.params.interval*30;

		timer = setInterval(function () {

			games[name].update(objects[name], interval);

		}, interval);

	}

	var stopGame = function (name) {

		clearInterval(timer);
		timer = null;

		games[name].tearDown();
	}

	var startInstance = function (name) {

		var page = data.getPageByName(name);

		if (name != "Home") {

			accels[name].start();

			if (hasMotion[name]) window.ondevicemotion = accels[name].motion;

			console.log(toggles[name].play[0]);

			toggles[name].play.addClass("hidden");
			toggles[name].stop.removeClass("hidden");

			if (page.game) runGame(name);
	
		}

	}

	var stopInstance = function (name) {

		//console.log("destory instance");

		var page = data.getPageByName(name);

		if (name != "Home") {

			accels[name].stop();

			window.ondevicemotion = null;

			toggles[name].play.removeClass("hidden");
			toggles[name].stop.addClass("hidden");

			if (page.game) stopGame(name);

		}
	}

	var resetInstance = function (name) {

		var page = data.getPageByName(name);

		if (name != "Home") {
			accels[name].reset();

			if (page.game) games[name].reset();
		}
	}

	return {
		setupReceivers:setupReceivers,
		addInstance:addInstance,
		getInstance:getInstance,
		initializeInstance:initializeInstance,
		startInstance:startInstance,
		stopInstance:stopInstance,
		resetInstance:resetInstance
	}

}]);