calibrateModule.factory("calibrate.service", ['progress.service', 'manager', 'utility', 'events', '$mdToast', function (progress, manager, g, events, $mdToast) {

	var accel;
	var obj;
	var parent;

	var yDir = "j";
	var xDir = "i";

	var messages = {
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

		g.setGlobalFactor(1);
		g.setSessionFactor(1);
		g.setDirection(yDir, 1);
		g.setDirection(xDir, 1);

		setTimeout(function() {

			manager.startInstance("calibrate");

			progress.runScheme();

		}, 3000);
		
	}

	var startCheck = function (direction) {

		//manager.resetInstance("calibrate");

		var acc = getCalibrationData(direction);
		
		clearInterval(accelWatch);

		accelWatch = setInterval(function () {

			time += 300;

			console.log("dummy acceleration", acc);

			accel.motion({accelerationIncludingGravity:acc, timeStamp:time});

			checkdirection(direction);

		}, 300);

	}
	
	var stop = function (oncomplete) {

		clearInterval(accelWatch);
		accelWatch = {};
		accelWatch = null;

		progress.reset();
		manager.stopInstance("calibrate");
		manager.resetInstance("calibrate");
		
	}

	var showToast = function (dir, type) {

		$mdToast.show(
            $mdToast.simple()
              .textContent(messages[dir][type])
              .position("bottom " + (dir == "xDir" ? "left" : "right"))
              .hideDelay(1000)
        );
	}


	var checkdirection = function (direction) {

		var relPos = obj.absolutePos();

		var value;

		if (direction == yDir) {
			value =  Math.abs(relPos.y)/obj.bounds.y;
		}
		else {
			value = 1 + Math.abs(relPos.x)/obj.bounds.x;
		}

		var _percent = value/2;

		console.log("percent", _percent);

		progress.setPercent(_percent);

		if (direction == yDir && Math.abs(relPos.y) >= obj.bounds.y) {

			var grav = g.c.dist/time*1e9;

			g.setGlobalFactor(grav/Math.abs(obj.acceleration.y));

			// if (relPos.y < 0) {
			if($(obj.el()).offset().top <= $(parent).height()/2) {
				//console.log("switched y direction");

				//showToast(messages.yDir.diff);
				showToast("yDir", "diff");

				g.setDirection(yDir, -1*g.getDirection("j"));
			}
			else {
				//showToast(messages.yDir.same);
				showToast("yDir", "same");
			}

		}
		else if (direction == xDir && Math.abs(relPos.x) >= obj.bounds.x) {

			// if (relPos.x < 0) {
			if($(obj.el()).offset().left <= $(parent).width()/2) {
				//console.log("switched x direction");
				
				//showToast(messages.xDir.diff);
				showToast("xDir", "diff");

				g.setDirection(xDir, -1*g.getDirection("i"));
			}
			else {
				
				//showToast(messages.xDir.same);
				showToast("xDir", "same");
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

		parent = result.arena;
		accel = result.accel;
		obj = result.object;

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
					console.log("run 50 percent");
					startCheck(xDir);
				},
				message:"checking x coord"
			},
			{
				percent:100,
				complete:function () {
					console.log("run 100 percent");
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