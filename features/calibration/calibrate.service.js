calibrateModule.factory("calibrate.service", ['progress.service', 'utility', 'events', '$mdToast', function (progress, g, events, $mdToast) {

	var accel;
	var obj;
	var parent;

	var yDir = "j";
	var xDir = "i";

	var sm = {
		xDir:{
			same:"x axis unchanged",
			switched:"x axis switched"
		},
		yDir:{
			same:"y axis unchanged",
			switched:"y axis switched"
		}
	}

	var accelWatch;
	var checkTimer;

	var element;

	var accelValue = 1;
	var acc = {};
	var time = 0;
	var _percent = 0;

	var showToast = function (dir, type) {

		$mdToast.show({
			template:"<md-toast class='absolute width height-200 padding0 margin0 bottom0'>" +
				    		"<div class='absolute width height'>" +
				    			"<div class='absolute width height md-toast-content bottom0'>" + 
				    				"<div class='absolute vcenter font-50'>" +
				    					sm[dir][type] +
				    				"</div>" +
				    			"</div>" +
				    		"</div>" +
						"</md-toast>",
			autoWrap:false,
			hideDelay:2000
		});
	}

	var getProgress = function () {

		return progress.getPercent();
	}

	var getMessage = function () {

		return progress.getMessage();
	}

	var getPercent = function () {

		return _percent*(1/scheme.length);
	}

	var update = function (object, interval) {


	}

	var onCreate = function (input) {

		console.log("calibrate init");

		parent = input.arena;
		accel = input.accel;
		obj = accel.obj;

		console.log("screen", obj.screenPos());
		console.log("relative", obj.relativePos());
		console.log("absolute", obj.absolutePos());

		progress.loadScheme(scheme);

	}

	var onEnter = function () {

	}

	var onStart = function () {

		console.log("calibrate start");

		g.setGlobalFactor(1);
		g.setSessionFactor(1);
		g.setDirection(yDir, 1);
		g.setDirection(xDir, 1);

		setTimeout(function() {

			events.dispatch("startCalibrate");
			progress.runScheme();

		}, 500);


	}

	var onEnd = function () {

		clearInterval(accelWatch);
		accelWatch = {};
		accelWatch = null;

	}

	var onLeave = function () {

		events.dispatch("leaveCalibrate");

	}

	var reset = function () {

		accel.stop();
		accel.reset();
	}

	var getCalibrationData = function (direction) {

		if (direction == yDir) {
			//obj.setPosition({x:-10, y:0});
			return {x:0, y:accelValue};
		}
		else if (direction == xDir) {
			//obj.setPosition({x:0, y:-10});
			return {x:accelValue, y:0};
		}
	}

	var startCheck = function (direction) {

		acc = {};
		acc = getCalibrationData(direction);
		var interval = 10;

		accel.start();

		clearInterval(accelWatch);
		accelWatch = setInterval(function () {

			time += interval;

			accel.motion({accelerationIncludingGravity:acc, timeStamp:time});

			checkdirection(direction);

		}, interval);

	}


	var checkdirection = function (direction) {


		var position = obj.absolutePos();
		//console.log("calibrate", "dir", direction, "position", position, "acc", acc);
		
		var value;
		if (direction == yDir) {
			value =  Math.abs(position.y)/obj.bounds.y;
		}
		else {
			value = Math.abs(position.x)/obj.bounds.x;
		}

		_percent = Math.floor(value)*100;

		if (direction == yDir && Math.abs(position.y) >= obj.bounds.y) {

			console.log("calibrate", "reached y boundary", position.y);

			stop();

			var grav = g.c.dist/time*1e9;
			g.setGlobalFactor(grav/Math.abs(obj.acceleration.y));

			g.setDirection(yDir, (position.y > 0 ? 1 : -1)*g.getDirection("j"));

			if (g.getDirection('j') < 0) {
				console.log("calibrate", "y direction SWITCHED");
				showToast("yDir", "switched");
			}
			else {
				console.log("calibrate", "y direction SAME");
				showToast("yDir", "same");
			}


			// if (position.y < 0) {
			// 	console.log("calibrate", "y direction SWITCHED");
			// 	showToast("yDir", "switched");
			// 	g.setDirection(yDir, -1*g.getDirection("j"));
			// }
			// else {
			// 	console.log("calibrate", "y direction SAME");
			// 	showToast("yDir", "same");
			// }

		}
		else if (direction == xDir && Math.abs(position.x) >= obj.bounds.x) {

			console.log("calibrate", "reached x boundary", position.x);

			stop();

			g.setDirection(xDir, (position.x > 0 ? 1 : -1)*g.getDirection("i"));

			if (g.getDirection('i') < 0) {
				console.log("calibrate", "x direction SWITCHED");
				showToast("xDir", "switched");
			}
			else {
				console.log("calibrate", "x direction SAME");
				showToast("xDir", "same");
			}

			// if (position.x < 0) {
			// 	console.log("calibrate", "x direction SWITCHED");
			// 	showToast("xDir", "switched");
			// 	g.setDirection(xDir, -1*g.getDirection("i"));
			// }
			// else {
			// 	console.log("calibrate", "x direction SAME");
			// 	showToast("xDir", "same");
			// }
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
			reset();
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
			reset();
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
			reset();
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
			reset();
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
				reset();
				events.dispatch("gohome");
			}, 500);
			
		}
	}
	]

	return {
		onCreate:onCreate,
		onEnter:onEnter,
		onStart:onStart,
		onEnd:onEnd,
		onLeave:onLeave,
		update:update,
		reset:reset,
		getProgress:getProgress,
		getMessage:getMessage
	}

}]);