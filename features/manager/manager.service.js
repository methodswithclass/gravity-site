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

		send.setup.receiver({name:"toggle", receiver:toggles});
		send.setup.receiver({name:"display", receiver:displays});
	}

	var addInstance = function (input) {

		console.log("add instance:", input.id);

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

		if (page.game) games[page.id].onCreate({arena:input.parent});

		objects[input.id] = object;
		accels[input.id] = accel;
		arenas[input.id] = input.parent;
		hasMotion[input.id] = input.deviceinput;

	}

	var getInstance = function (id) {

		return {arena:arenas[id], object:objects[id], accel:accels[id]};
	}

	var enterInstance = function (id) {

		console.log("enter instance:", id);

		var page = data.getPageById(id);

		accels[id].reset();

		if (page.game) {
			games[id].onEnter({arena:arenas[id]});
			displays[id].time.html(games[id].clock());
			displays[id].points.html(games[id].points());
		}
	}

	var runGame = function (id) {

		console.log("run game:", id);

		var page = data.getPageById(id);
		var interval = page.params.interval;

		console.log(page.id, interval)

		games[id].onStart();

		timer = setInterval(function () {

			//accels[id].update();
			
			
			games[id].update(objects[id], interval);
			displays[id].time.html(games[id].clock());
			displays[id].points.html(games[id].points());

			if (games[id].zeroTime()) {
				stopInstance(id);
			}
		

		}, interval);

	}

	var stopGame = function (id) {

		console.log("stop game:", id);

		games[id].onEnd();
	}

	var startInstance = function (id) {

		console.log("start instance:", id);

		var page = data.getPageById(id);

		if (id != "home") {

			accels[id].start();

			if (hasMotion[id]) window.ondevicemotion = accels[id].motion;

			//console.log(toggles[id].play[0]);

			toggles[id].play.addClass("hidden");
			toggles[id].stop.removeClass("hidden");

			if (page.game) runGame(id);
	
		}

	}

	var stopInstance = function (id, back) {

		//console.log("destory instance");

		console.log("stop instance:", id);

		var page = data.getPageById(id);

		if (id != "home") {

			clearInterval(timer);
			timer = null;

			accels[id].stop();
			accels[id].reset();

			window.ondevicemotion = null;

			toggles[id].play.removeClass("hidden");
			toggles[id].stop.addClass("hidden");

			if (page.game) stopGame(id, back);

		}
	}

	var leaveInstance = function (id) {

		console.log("leave instance:", id);

		var page = data.getPageById(id);

		if (page.game) games[id].onLeave();

	}

	var resetInstance = function (id) {

		console.log("reset instance:", id); 

		var page = data.getPageById(id);

		if (id != "home") {

			accels[id].stop();
			accels[id].reset();

			if(page.game) {
				games[id].reset();
			}
		}
	}

	return {
		setupReceivers:setupReceivers,
		addInstance:addInstance,
		getInstance:getInstance,
		enterInstance:enterInstance,
		startInstance:startInstance,
		stopInstance:stopInstance,
		leaveInstance:leaveInstance,
		resetInstance:resetInstance
	}

}]);