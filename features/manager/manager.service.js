managerModule.factory("manager", ["accelerometer", "object.service", "data.service", 'send', 'settings.service', 'games.library', 'utility', function (accelerometer, objectFact, data, send, settings, games, util) {

	var object;
	var accel;

	var objects = {};
	var accels = {};
	var arenas = {};
	var displays = {};
	var toggles = {};

	var timer;
	var interval;

	var setupReceivers = function () {

		console.log("manager setup receivers");

		send.setup.receiver({name:"toggle", receiver:toggles});
		send.setup.receiver({name:"display", receiver:displays});
	}

	var setStats = function (id) {

		displays[id].stats.html(
			"x: " + accel.unfiltered().x + "<br>" + 
			"y: " + accel.unfiltered().y + "<br>" + 
			"global factor: " + util.getFactor(util.c.factorG) + "<br>" + 
			"session factor: " + util.getFactor(util.c.factorS) + "<br>" +
			"factor: " + util.getFactor() + "<br>" + 
			"xDir: " + util.getDirection("i") + "<br>" + 
			"yDir: " + util.getDirection("j") + "<br>"
		);
	}

	var startStage = function (id) {

		//id page must be set to page.type.stages

		console.log("manager", "run game:", id);

		var page = data.getPageById(id);
		var interval = page.params.interval;

		if (page.type.stages) games[id].onStart();

		timer = setInterval(function () {

			//accels[id].update();
			
			if (page.type.stages) games[id].update(objects[id], interval);

			if (page.type.accel) setStats(id);

			if (page.type.game) {
				displays[id].time.html(games[id].clock());
				displays[id].points.html(games[id].points());

				if (games[id].zeroTime()) {
					stopInstance(id);
					resetInstance(id);
				}
			}

		}, interval);

	}

	var stopStage = function (id) {

		//id page must be set to page.type.stages

		console.log("manager", "stop game:", id);

		var page = data.getPageById(id);
		if (page.type.stages) games[id].onEnd();
	}

	var leaveStage = function (id) {

		//id page must be set to page.type.stages

		console.log("manager", "leave game:", id);

		var page = data.getPageById(id);
		if (page.type.stages) games[id].onLeave();

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

		if (page.type.stages) games[page.id].onCreate({arena:input.parent, object:object, accel:accel});

		objects[input.id] = object;
		accels[input.id] = accel;
		arenas[input.id] = input.parent;

	}

	var enterInstance = function (id) {

		console.log("manager", "enter instance:", id);

		var page = data.getPageById(id);

		if (page.type.accel) accels[id].reset();
			
		if (page.type.stages) games[id].onEnter({arena:arenas[id]});

		if (page.type.accel) setStats(id);

		if (page.type.game) {
			displays[id].time.html(games[id].clock());
			displays[id].points.html(games[id].points());
		}
	}

	var startInstance = function (id) {

		console.log("manager", "start instance:", id);

		var page = data.getPageById(id);

		if (id != "home") {

			if (page.type.accel) accels[id].start();

			if (page.type.accel) window.ondevicemotion = accels[id].motion;

			if (page.type.accel && page.type.motion) {
				toggles[id].play.addClass("hidden");
				toggles[id].stop.removeClass("hidden");
			}

			startStage(id);
	
		}

	}

	var stopInstance = function (id) {

		console.log("manager", "stop instance:", id);

		var page = data.getPageById(id);

		if (id != "home") {

			clearInterval(timer);
			timer = null;

			if (page.type.accel) accels[id].stop();

			window.ondevicemotion = null;

			if (page.type.accel && page.type.motion) {
				toggles[id].play.removeClass("hidden");
				toggles[id].stop.addClass("hidden");
			}

			stopStage(id);

		}
	}

	var leaveInstance = function (id) {

		console.log("manager", "leave instance:", id);

		var page = data.getPageById(id);
		leaveStage(id);

	}

	var resetInstance = function (id) {

		console.log("manager", "reset instance:", id);

		var page = data.getPageById(id);

		if (id != "home") {

			if (page.type.accel) accels[id].reset();
			if (page.type.game) games[id].reset();
		
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
		leaveInstance:leaveInstance,
		resetInstance:resetInstance
	}

}]);