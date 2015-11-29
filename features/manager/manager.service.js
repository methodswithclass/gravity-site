managerModule.factory("manager", ["accelerometer", "object.service", "data.service", 'send', function (accelerometer, objectFact, data, send) {

	var object;
	var accel;

	var objects = {};
	var accels = {};
	var hasMotion = {};
	var toggles = {};

	var setupReceivers = function () {

		send.receiver({name:"toggle", receiver:toggles});
	}

	var addInstance = function (input) {

		console.log("create instance: " + input.name);

		var game = data.getPageByName(input.name);

		object = new objectFact({
			parent:input.parent, 
			object:input.object
		});
			
		accel = new accelerometer({
			params:game.params,
			object:object
		});

		accel.setinitial(0,0);



		// accel.getMotion(function (position, velocity, acceleration) {
				
		// 	//console.log(position);

		// 	object.setPosition(position);
		// 	object.setVelocity(velocity);
		// 	object.setAcceleration(acceleration);

		// });

		objects[input.name] = object;
		accels[input.name] = accel;
		hasMotion[input.name] = input.deviceinput;

	}

	var getInstance = function (name) {

		return {object:objects[name], accel:accels[name]};
	}

	var startInstance = function (name) {

		if (name != "Home") {

			accels[name].start();

			if (hasMotion[name]) window.ondevicemotion = accels[name].motion;

			console.log(toggles[name].play[0]);

			toggles[name].play.addClass("hidden");
			toggles[name].stop.removeClass("hidden");
	
		}

	}

	var stopInstance = function (name) {

		//console.log("destory instance");

		if (name != "Home") {

			accels[name].stop();

			window.ondevicemotion = null;

			toggles[name].play.removeClass("hidden");
			toggles[name].stop.addClass("hidden");

		}
	}

	var resetInstance = function (name) {

		if (name != "Home") {
			accels[name].reset();
		}
	}

	return {
		setupReceivers:setupReceivers,
		addInstance:addInstance,
		getInstance:getInstance,
		startInstance:startInstance,
		stopInstance:stopInstance,
		resetInstance:resetInstance
	}

}]);