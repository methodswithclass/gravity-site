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

		send.receiver({name:"toggle", receiver:toggles});
		send.receiver({name:"display", receiver:displays});
	}

	var addInstance = function (input) {

		console.log("create instance: " + input.name);

		var page = data.getPageByName(input.name);

		object = new objectFact({
			name:input.name,
			object:input.object,
			arena:input.parent,
			params:page
		});
			
		accel = new accelerometer({
			name:input.name,
			params:page.params,
			object:object
		});

		accel.initialize({
			arena:input.parent
		});

		if (page.game) games[page.name].onCreate({arena:input.parent});

		objects[input.name] = object;
		accels[input.name] = accel;
		arenas[input.name] = input.parent;
		hasMotion[input.name] = input.deviceinput;

	}

	var getInstance = function (name) {

		return {arena:arenas[name], object:objects[name], accel:accels[name]};
	}

	var enterInstance = function (name) {

		console.log("enter " + name);

		var page = data.getPageByName(name);

		accels[name].reset();

		if (page.game) {
			games[name].onEnter({arena:arenas[name]});
			displays[name].time.html(games[name].clock());
			displays[name].points.html(games[name].points());
		}
	}

	var runGame = function (name) {

		var page = data.getPageByName(name);
		var interval = 1000*page.params.interval*20;

		games[name].onStart();

		timer = setInterval(function () {

			//accels[name].update();
			
			
			games[name].update(objects[name], interval);
			displays[name].time.html(games[name].clock());
			displays[name].points.html(games[name].points());

			if (games[name].zeroTime()) {
				stopInstance(name);
			}
		

		}, interval);

	}

	var stopGame = function (name) {

		games[name].onEnd();
	}

	var startInstance = function (name) {

		console.log("start " + name);

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

	var stopInstance = function (name, back) {

		//console.log("destory instance");

		console.log("stop " + name);

		var page = data.getPageByName(name);

		if (name != "Home") {

			clearInterval(timer);
			timer = null;

			accels[name].stop();
			accels[name].reset();

			window.ondevicemotion = null;

			toggles[name].play.removeClass("hidden");
			toggles[name].stop.addClass("hidden");

			if (page.game) stopGame(name, back);

		}
	}

	var leaveInstance = function (name) {

		console.log("leave " + name);

		var page = data.getPageByName(name);

		if (page.game) games[name].onLeave();

	}

	var resetInstance = function (name) {

		var page = data.getPageByName(name);

		if (name != "Home") {

			if (page.game) games[name].reset();
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