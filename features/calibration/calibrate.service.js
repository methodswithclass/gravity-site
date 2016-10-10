calibrateModule.factory("calibrate.service", ['progress.service', 'utility', 'events', '$mdToast', function (progress, g, events, $mdToast) {

	var accel;
	var obj;
	var parent;

	var yDir = "j";
	var xDir = "i";

	var calDir = yDir;

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
	var loadingTimer;

	var element;

	var accelValue = 1;
	var acc = {};
	var time = 0;
	var current = [];
	var curr = 0;
	var _percent = 0;
	var i = 0;

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

		return _percent;
	}

	var getAccel = function () {

		return curr;
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

		window.ondevicemotion = accel.raw;

	}

	var onStart = function () {

		console.log("calibrate start");

		g.setGlobalFactor(1);
		g.setSessionFactor(1);
		g.setDirection(yDir, 1);
		g.setDirection(xDir, 1);

		setTimeout(function() {

			events.dispatch("progress-start");

		}, 500);


	}

	var onEnd = function () {

		stopWatch();

	}

	var onLeave = function () {

		events.dispatch("calibrate-stop");

	}

	var stopWatch = function () {

		clearInterval(accelWatch);
		accelWatch = {};
		accelWatch = null;
	}

	var reset = function () {

		stopWatch();
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

	var loading = function () {

		loadingTimer = setInterval(function () {

			_percent += 0.003;

			console.log("loading timer", _percent);

		}, 30);

	}

	var stopLoading = function () {

		clearInterval(loadingTimer);
		loadingTimer = {};
		loadingTimer = null;

	}

	var calibrateDirection = function () {

		console.log("calibrate direction");

		if (calDir == yDir) {

			current.push(accel.getRaw());

			_percent = 1/1000;

			if (current.length > 1000)

				curr = current.pop().y;

				if (curr > 0) {

					g.setDirection(yDir, -1);

					console.log("calibrate", "y direction SWITCHED");
					showToast("yDir", "switched");
					
				}
				else if (curr < 0) {
					console.log("calibrate", "y direction SAME");
					showToast("yDir", "same");
					

				}

				calDir = xDir;
				current.length = 0;
				current = null;
				current = [];
				i = 0;

			}



		}
		else if (calDir == xDir) {

			current.push(accel.getRaw());

			_percent = 1/1000;

			if (current.length > 1000)

				curr = current.pop().x;

				if (curr < 0) {

					g.setDirection(xDir, -1);

					console.log("calibrate", "y direction SWITCHED");
					showToast("yDir", "switched");
				}
				else if (curr > 0) {
					console.log("calibrate", "y direction SAME");
					showToast("yDir", "same");
				}

				calDir = yDir;
				current.length = 0;
				current = null;
				current = [];
				i = 0;

			}

		}

		//curr = 1;


	}


	var calibrateFactor = function () {


		var position = obj.absolutePos();
		//console.log("calibrate", "dir", direction, "position", position, "acc", acc);
		
		var value =  Math.abs(position.y)/obj.bounds.y;

		_percent = value;

		if (Math.abs(position.y) >= obj.bounds.y) {

			console.log("calibrate", "reached y boundary", position.y);

			var grav = g.c.dist/time*1e9;
			g.setGlobalFactor(grav/Math.abs(obj.acceleration.y));
		}

	}

	var startCheck = function () {

		acc = {};
		acc = getCalibrationData(yDir);
		var interval = 10;

		accel.start();

		clearInterval(accelWatch);
		accelWatch = setInterval(function () {

			console.log("check factor");

			time += interval;

			accel.motion({accelerationIncludingGravity:acc, timeStamp:time});

			calibrateFactor();

		}, interval);

	}

	var calibrate = function () {


		var interval = 10;

		accel.start();

		i = 0;

		clearInterval(accelWatch);
		accelWatch = setInterval(function () {

			time += interval;

			calibrateDirection();

		}, interval);

	}

	events.on("cal-service-accel", function () {

		calibrate();
	});

	var scheme = [
	{
		index:0,
		id:"loading",
		message:"load calibration",
		percent:0.2,
		update:function (percent) {

			return getPercent();
		},
		start:function () {
			console.log("begin phase 1");
			loading();
			events.dispatch("calibrate-start");
		},
		complete:function () {

			console.log("complete phase 1");
			stopLoading();
			reset();
			events.dispatch("progress-next");
		}
	},
	{
		index:1,
		id:"checkFactor",
		message:"calibrate factor",
		percent:0.4,
		update:function (percent) {
			return 0.2 + getPercent()/5;
		},
		start:function () {
			console.log("begin phase 2");
			time = (new Date()).getTime();
			startCheck();
		},
		complete:function () {
			console.log("complete phase 2");
			reset();
			events.dispatch("progress-next");
		}
	},
	{
		index:2,
		id:"checkY",
		message:"check y axis",
		percent:0.6,
		update:function (percent) {
			return 0.4 + getPercent();
		},
		start:function () {
			console.log("begin phase 3");
			events.dispatch("tiltunder");
			events.dispatch("calibrate-pause");
		},
		complete:function () {
			console.log("complete phase 3");
			reset();
			events.dispatch("progress-next");
		}
	},
	{
		index:2,
		id:"checkX",
		message:"check x axis",
		percent:0.8,
		update:function (percent) {
			return 0.6 + getPercent();
		},
		start:function () {
			console.log("begin phase 3");
			events.dispatch("tiltright");
			events.dispatch("calibrate-pause");
		},
		complete:function () {
			console.log("complete phase 3");
			reset();
			events.dispatch("progress-next");
		}
	},
	{
		index:3,
		id:"finish",
		message:"finish calibration",
		percent:1,
		update:function (percent) {
			return 0.8 + getPercent();
		},
		start:function () {
			console.log("begin phase 4");
			loading();
			events.dispatch("calibrate-start");
		},
		complete:function () {
			console.log("complete phase 4");
			stopLoading();
			reset();
			events.dispatch("progress-next");
		}
	},
	{
		index:4,
		id:"complete",
		message:"completed calibration, thank you",
		percent:1,
		update:function (percent) {
			return percent;
		},
		start:function () {
			console.log("begin phase 5");
			events.dispatch("calibrate-start");
			stop();
		},
		complete:function () {

			console.log("complete phase 5");

			setTimeout(function () {
				reset();
				progress.hardStop();
				events.dispatch("calibrate-stop");
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
		getMessage:getMessage,
		getAccel:getAccel
	}

}]);