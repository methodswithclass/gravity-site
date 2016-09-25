calibrateModule.factory("calibrate.service", ['progress.service', 'manager', 'utility', 'events', '$mdToast', function (progress, manager, g, events, $mdToast) {

	var accel;
	var obj;
	var parent;

	var yDir = "j";
	var xDir = "i";

	var sm = {
		xDir:{
			same:"x direction same",
			diff:"x direction switched"
		},
		yDir:{
			same:"y direction same",
			diff:"y direction switched"
		}
	}

	var accelWatch;
	var checkTimer;

	var element;

	var time = 0;
	var _percent = 0;

	var showToast = function (dir, type) {

		$mdToast.show(
            $mdToast.simple()
				.content(sm[dir][type])
				.position("bottom " + dir == "yDir" ? "left" : "right")
				.hideDelay(2000)
        );
	}

	var getProgress = function () {

		return progress.getPercent();
	}

	var getMessage = function () {

		return progress.message();
	}

	var getPercent = function () {

		return _percent*(1/scheme.length);
	}

	var getCalibrationData = function (direction) {

		var accelValue = 1;

		if (direction == yDir) {
			obj.setPosition({x:-10, y:0});
			return {x:0, y:accelValue};
		}
		else if (direction == xDir) {
			obj.setPosition({x:0, y:-10});
			return {x:accelValue, y:0};
		}
	}

	var reset = function () {

		console.log("calibrate reset");

		obj.setPosition({x:0, y:0});

		progress.reset();
		manager.resetInstance("calibrate");
	}

	var start = function () {

		console.log("calibrate start");

		g.setGlobalFactor(1);
		g.setSessionFactor(1);
		g.setDirection(yDir, 1);
		g.setDirection(xDir, 1);

		accel.getMotion(function (position, velocity, acceleration) {

			obj.position = position;
			obj.velocity = velocity;
			obj.acceleration = acceleration;
		})

		setTimeout(function() {

			manager.startInstance("calibrate");

			progress.runScheme();

		}, 500);
		
	}

	var stop = function (oncomplete) {

		clearInterval(accelWatch);
		accelWatch = {};
		accelWatch = null;
		
	}

	var startCheck = function (direction) {

		var acc = getCalibrationData(direction);
		
		clearInterval(accelWatch);

		var interval = 30;

		accelWatch = setInterval(function () {

			time += interval;

			accel.motion({accelerationIncludingGravity:acc, timeStamp:time});

			checkdirection(direction);

		}, interval);

	}


	var checkdirection = function (direction) {


		var relPos = obj.absolutePos();
		console.log("calibrate", "dir", direction, "relPos", relPos);
		
		var value;
		if (direction == yDir) {
			value =  Math.abs(relPos.y)/obj.bounds.y;
		}
		else {
			value = Math.abs(relPos.x)/obj.bounds.x;
		}

		//_percent = Math.abs(direction == xDir ? relPos.x : relPos.y)/obj.bounds.y;;
		_percent = Math.floor(value)*100;

		console.log("calibration", "in check", _percent + "%");
		
		//progress.setPercent(_percent);

		if (direction == yDir && Math.abs(relPos.y) >= obj.bounds.y) {

			console.log("calibrate", "reached y boundary", relPos.y);

			stop();

			var grav = g.c.dist/time*1e9;
			g.setGlobalFactor(grav/Math.abs(obj.acceleration.y));

			if (relPos.y < 0) {
			//if(obj.absolutePos().y <= 0) {
				console.log("calibrate", "y direction SWITCHED");
				showToast("yDir", "diff");
				g.setDirection(yDir, -1*g.getDirection("j"));
			}
			else {
				console.log("calibrate", "y direction SAME");
				showToast("yDir", "same");
			}

		}
		else if (direction == xDir && Math.abs(relPos.x) >= obj.bounds.x) {

			console.log("calibrate", "reached x boundary", relPos.y);

			stop();

			if (relPos.x < 0) {
			//if(obj.absolutePos().x <= 0) {
				console.log("calibrate", "x direction SWITCHED");
				showToast("xDir", "diff");
				g.setDirection(xDir, -1*g.getDirection("i"));
			}
			else {
				console.log("calibrate", "x direction SAME");
				showToast("xDir", "same");
			}
		}

	}

	var scheme = [
	{
		index:0,
		id:"loading",
		message:"loading calibration",
		percent:25,
		update:function (percent) {
			return percent + 1;
		},
		start:function () {
			console.log("begin phase 1");

		},
		complete:function () {

			console.log("complete phase 1");

		}
	},
	{
		index:1,
		id:"checkY",
		message:"checking y axis",
		percent:50,
		update:function (percent) {
			return percent + getPercent();
		},
		start:function () {
			console.log("begin phase 2");
			time = (new Date()).getTime();
			startCheck(yDir);
		},
		complete:function () {

			console.log("complete phase 2");

		}
	},
	{
		index:2,
		id:"checkX",
		message:"checking x axis",
		percent:75,
		update:function (percent) {
			return percent + getPercent();
		},
		start:function () {
			console.log("begin phase 3");
			startCheck(xDir);
		},
		complete:function () {
			console.log("complete phase 3");

		}
	},
	{
		index:3,
		id:"finish",
		message:"finishing calibration",
		percent:100,
		update:function (percent) {
			return percent + 1;
		},
		start:function () {
			console.log("begin phase 4");
		},
		complete:function () {
			console.log("complete phase 4");
		}
	},
	{
		index:4,
		id:"complete",
		message:"completed calibration, thank you",
		percent:100,
		update:function (percent) {
			return percent;
		},
		start:function () {
			console.log("begin phase 5");
			stop();
		},
		complete:function () {

			console.log("complete phase 5");

			setTimeout(function () {
				manager.stopInstance("calibrate");
				events.dispatch("gohome");
			}, 500);
			
		}
	}
	]

	var init = function (parent, object) {

		console.log("calibrate init");

		manager.addInstance({
			id:"calibrate",
			parent:parent,
			object:object,
			deviceinput:false
		});

		var result = manager.getInstance("calibrate");

		parent = result.arena;
		accel = result.accel;
		obj = result.object;

		console.log("screen", obj.screenPos());
		console.log("relative", obj.relativePos());
		console.log("absolute", obj.absolutePos());

		progress.loadScheme(scheme);
		
	}

	return {
		init:init,
		getProgress:getProgress,
		getMessage:getMessage,
		reset:reset,
		start:start
	}

}]);