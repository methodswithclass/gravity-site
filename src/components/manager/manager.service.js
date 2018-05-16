managerModule.factory("manager.service", ["utility.service", "data.service", 'send', 'settings.service', 'games.library', 'cookie.service', function (utility, data, send, settings, games, cookie) {

	var util = mcaccel.utility;

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
			"x: " + accels[id].unfiltered().x + "<br>" + 
			"y: " + accels[id].unfiltered().y + "<br>" + 
			"global factor: " + util.getFactor(util.const.factorG) + "<br>" + 
			"session factor: " + util.getFactor(util.const.factorS) + "<br>" +
			"factor: " + util.getFactor() + "<br>" + 
			"xDir: " + util.getAxis("i") + "<br>" + 
			"yDir: " + util.getAxis("j") + "<br>"
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

			if (page.type.accel && data.stats) setStats(id);

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

    var getObjSetting = function (obj) {

        var settingSize = settings.settings.obj.size;
        var marbleID = settings.settings.obj.obj;
        var marble = data.getMarble(marbleID);

        console.log("getObj cookie ID", marbleID, "marble", marble);

        obj.shape = marble.shape;
        obj.src = marble.src || null;
        obj.size = settingSize;

        return obj;

    }

    var validatePageObjects = function (id) {

        return id !== "space" && id !== "calibrate"
    }

	var addInstance = function (input) {

		console.log("manager", "add instance:", input.id);

		var page = data.getPageById(input.id);

		if (page.type.accel) {

			// console.log("manager object", input.object);

            var objParams = page.obj;

            if (validatePageObjects(input.id)) objParams = getObjSetting(objParams);

			objects[input.id] = new mcaccel.object({
				id:input.id,
				arena:input.arena,
				params:objParams
            });

            arenas[input.id] = input.arena;
            
			accels[input.id] = new mcaccel.accelerometer({
				id:input.id,
				object:objects[input.id],
				params:page.params
			});

		}

		if (page.type.stages) games[page.id].onCreate({object:objects[input.id], accel:accels[input.id]});

		if (page.type.accel) {
			
			accels[input.id].getMotion(input.id, function (id, pos, vel, acc) {

				// console.log("set position", id, pos.x, pos.y);

				objects[id].setPosition(pos);
				objects[id].setVelocity(vel);
				objects[id].setAcceleration(acc);
			});
		}

	}

	var enterInstance = function (id) {

		console.log("manager", "enter instance:", id);

		var page = data.getPageById(id);

		if (page.type.accel) {
			console.log("has type accel");
			accels[id].reset();
		}

		if (page.type.stages) games[id].onEnter({arena:arenas[id]});

		if (page.type.accel && data.stats) setStats(id);

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

    var changeObject = function (obj) {

        var setSize = obj.size;

        for (var i in objects) {

            if (i == "balance" && obj.size > 275) {
                obj.size = 275;
            }

            if (validatePageObjects(i)) objects[i].changeShape(obj.shape, obj);

            obj.size = setSize;
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
        resetInstance: resetInstance,
        changeObject: changeObject
	}

}]);