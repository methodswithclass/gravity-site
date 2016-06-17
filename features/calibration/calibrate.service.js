calibrateModule.factory("calibrate.service", ['progress.service', 'manager', 'utility', 'events', function (progress, manager, g, events) {

	var accel;
	var obj;

	var yDir = "j";
	var xDir = "i";

	var accelWatch;
	var checkTimer;

	var element;

	var time = 0;

	var getCalibrationData = function (direction) {

		//console.log(accel.down);

		var accelValue = 1;

		if (direction == yDir) { 
			accel.setinitial(-10, 0); 
			return {x:0, y:accelValue};
		}
		else if (direction == xDir) {
			accel.setinitial(0, -10);
			return {x:accelValue, y:0};
		}
	}

	var start = function () {

		g.setFactor(1);
		g.setDirection(yDir, 1);
		g.setDirection(xDir, 1);

		setTimeout(function() {

			manager.startInstance("calibrate");

			//accel.start();

			progress.runScheme();

		}, 500);
		
	}

	var startCheck = function (direction) {

		manager.resetInstance("calibrate");

		var acc = getCalibrationData(direction);
		
		clearInterval(accelWatch);

		accelWatch = setInterval(function () {

			time += 10;

			//console.log(acc);

			accel.motion({accelerationIncludingGravity:acc, timeStamp:time});

			checkdirection(direction);

		}, 10);

	}
	
	var stop = function (oncomplete) {

		clearInterval(accelWatch);
		accelWatch = {};
		accelWatch = null;

		progress.reset();
		manager.stopInstance("calibrate");
		manager.resetInstance("calibrate");
		
	}


	var checkdirection = function (direction) {

		var relPos = obj.absolutePos();

		var value;

		if (direction == yDir) {
			value =  Math.abs(relPos.y)/obj.bounds.y;
			console.log("ydir", value); 
		}
		else {
			value = 1 + Math.abs(relPos.x)/obj.bounds.x;
			console.log("xdir", value);
		}

		var _percent = value/2;

		progress.setPercent(_percent);

		//console.log(obj.yMax);

		if (direction == yDir && Math.abs(relPos.y) >= obj.bounds.y) {

			var grav = g.c.dist/time*1e9;

			g.setFactor(grav/Math.abs(obj.acceleration.y));

			if (relPos.y < 0) {
				g.setDirection(yDir, -1);
			}

		}
		else if (direction == xDir && Math.abs(relPos.x) >= obj.bounds.x) {

			if (relPos.x < 0) {
				g.setDirection(xDir,-1);
			}

		}

	}

	var init = function (parent, object) {

		manager.addInstance({
			id:"calibrate",
			parent:parent,
			object:object,
			deviceinput:false
		});

		var result = manager.getInstance("calibrate");

		accel = result.accel;
		obj = result.object;

		//console.log(accel);
		//console.log(object);

		progress.loadScheme([
			{
				percent:0,
				complete:function () {
					console.log("run 0 percent");
					time = (new Date()).getTime();
					startCheck(yDir);
				},
				message:"checking y coord"
			},
			{
				percent:50,
				complete:function () {
					//console.log("run 50 percent");
					startCheck(xDir);
				},
				message:"checking x coord"
			},
			{
				percent:100,
				complete:function () {

					//finished();
					events.dispatch("leave");
					stop();
				},
				message:"completed"
			}
		]);
		
	}

	var getProgress = function () {

		return progress.getPercent();
	}

	var message = function () {

		return progress.message();
	}

	var reset = function () {

		progress.reset();
	}

	return {
		init:init,
		getProgress:getProgress,
		message:message,
		reset:reset,
		start:start
	}

}]);