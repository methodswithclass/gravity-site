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

	var element;

	var accelValue = 0.01;
	var acc = {};
	var time = 0;
	var position;
	var current = [];
	var curr = 0;
	var running = true;

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

	var getPhasePercent = function () {

		return phase_p;
	}

	var getAccel = function () {

		return {
			curr:curr,
			factor:g.getFactor()
		};
	}

	var toggleRunning = function () {

		if (running) {

			running = false;
		}
		else {
			running = true;
		}
	}

	var update = function (object, interval) {


	}

	var reset = function () {

		accel.stop();
		accel.reset();
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

		//window.ondevicemotion = accel.motion;

	}

	var onStart = function () {

		console.log("calibrate start");

		g.setGlobalFactor(1);
		g.setSessionFactor(1);
		g.setDirection(yDir, 1);
		g.setDirection(xDir, 1);

		setTimeout(function() {

			events.dispatch("calibrate-start");
			progress.startProgress();

		}, 500);


	}

	var onEnd = function () {

	}

	var onLeave = function () {

		events.dispatch("calibrate-stop");

	}

	var getCalibrationData = function (direction) {

		if (direction == yDir) {
			return {x:0, y:accelValue};
		}
		else if (direction == xDir) {
			return {x:accelValue, y:0};
		}
	}

	var num_phases = 5;

	var begin = function (index) {

		console.log("begin phase", index);
		
		if (index + 1 >= num_phases) {
			events.dispatch("tiltnone");
			toggleRunning();
		}
	}

	var loading = function (index) {

		var p;

		if (running) {
			console.log("running phase", index);
			p = 0.003;
		}
		else {
			console.log("pausing phase", index);
			p = 0;
		}

		return p;
	}

	var next = function (index) {

		reset();
				
		console.log("complete phase", index);	

		phase_p = 0;

		if (index + 1 < num_phases) {
			progress.setIndex(index + 1);
			progress.startPhase();
		}
		else {
			progress.hardStop();
			events.dispatch("gohome");
		}
	}


	var checkFactor = {

		start:function (index) {

			console.log("begin phase", index);
				
			time = (new Date()).getTime();

			acc = {};
			acc = getCalibrationData(yDir);

			accel.start();
		},
		check:function (index, interval) {

			if (running) {

				console.log("running phase", index);

				time += interval;

				accel.motion({accelerationIncludingGravity:acc, timeStamp:time});

				position = obj.absolutePos();
				
				phase_p =  Math.abs(position.y)/obj.bounds.y;

			}
			else {
				console.log("pausing phase 1");
			}

			return phase_p/num_phases;
		},
		complete:function (index) {

			console.log("calibrate", "reached y boundary");

			var objaccel = Math.abs(obj.acceleration.y);
			objaccel = objaccel != 0 ? objaccel : 1;

			g.setGlobalFactor(g.c.dist*1e9/time/objaccel);

			console.log("calibrate", "time", time, "accel", objaccel, "factor", g.getGlobalFactor());

			next(index);
			
		}
	}

	var checkAxis = {

		start:function (index, axis) {

			console.log("begin phase", index);

			events.dispatch(axis == yDir ? "tiltunder" : "tiltright");
			toggleRunning();

			accel.start();
		},
		check:function (index, axis) {

			if (running) {

				console.log("running phase", index);

				current.push(accel.getRaw());

				phase_p += 1/1000/100;

				curr = current.pop()[axis == yDir ? "y" : "x"];

			}
			else {
				console.log("pausing phase", index);
				phase_p += 0;
			}

			return phase_p/num_phases;
		},
		complete:function (index, axis) {

			reset();

			var check = axis == yDir ? curr >= 0 : curr < 0;

			if (check) {

				g.setDirection(axis, axis == yDir ? 1: -1);

				console.log("calibrate", (axis == yDir ? "y": "x"), "direction", (axis == yDir ? "SWITCHED": "SAME"));
				showToast((axis == yDir ? "yDir": "xDir"), (axis == yDir ? "switched": "same"));
				
			}
			else {
				console.log("calibrate", (axis == yDir ? "y": "x"),  "direction", (axis == yDir ? "SAME": "SWITCHED"));
				showToast((axis == yDir ? "yDir": "xDir"), (axis == yDir ? "same": "switched"));
			}

			current.length = 0;
			current = null;
			current = [];
			
			next(index);
		}
	}

	var scheme = {
		num:num_phases,
		phases:[
		{
			index:0,
			id:"loading",
			message:"load calibration",
			percent:1/num_phases,
			start:function() {
				begin(0);
			},
			update:function (interval, percent) {

				return percent + loading(0);
			},
			complete:function () {

				next(0);
			}
		},
		{
			index:1,
			id:"checkFactor",
			message:"calibrate factor",
			percent:2/num_phases,
			start:function () {
				
				checkFactor.start(1);
			},
			update:function (interval, percent) {

				return percent + checkFactor.check(1, interval);
			},
			complete:function () {
				
				checkFactor.complete(1);

			}
		},
		{
			index:2,
			id:"checkY",
			message:"check y axis",
			percent:3/num_phases,
			start:function () {
				
				checkAxis.start(2, yDir);
			},
			update:function (interval, percent) {

				return percent + checkAxis.check(2, yDir);
			},
			complete:function () {

				checkAxis.complete(2, yDir);
			}
		},
		{
			index:3,
			id:"checkX",
			message:"check x axis",
			percent:4/num_phases,
			start:function () {
				
				checkAxis.start(3, xDir);
			},
			update:function (interval, percent) {

				return percent + checkAxis.check(3, xDir);
			},
			complete:function () {

				checkAxis.complete(3, xDir);
			}
		},
		{
			index:4,
			id:"finish",
			message:"finish up calibration",
			percent:5/num_phases,
			start:function() {

				begin(4);
			},
			update:function (interval, percent) {

				return percent + loading(4);
			},
			complete:function () {

				next(4);
			}
		}
		]
	}

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
		getPhasePercent:getPhasePercent,
		getAccel:getAccel,
		toggleRunning:toggleRunning
	}

}]);