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

	var accelValue = 1;
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

		return curr;
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

		window.ondevicemotion = accel.raw;

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
	var scheme = {
		num:num_phases,
		phases:[
		{
			index:0,
			id:"loading",
			message:"load calibration",
			percent:1/num_phases,
			start:function() {

				console.log("begin phase 0");

			},
			update:function (interval, percent) {

				var p;

				if (running) {
					console.log("running phase 0");
					p = percent + 0.003;
				}
				else {
					console.log("pausing phase 0");
					p = percent;
				}

				return p;
			},
			complete:function () {

				reset();
				
				console.log("complete phase 0");	

				progress.setIndex(1);
				progress.startPhase();
			}
		},
		{
			index:1,
			id:"checkFactor",
			message:"calibrate factor",
			percent:2/num_phases,
			start:function () {
				console.log("begin phase 1");
				
				time = (new Date()).getTime();

				acc = {};
				acc = getCalibrationData(yDir);

				accel.start();

			},
			update:function (interval, percent) {

				if (running) {

					console.log("running phase 1");

					time += interval;

					accel.motion({accelerationIncludingGravity:acc, timeStamp:time});

					position = obj.absolutePos();
					
					phase_p =  Math.abs(position.y)/obj.bounds.y;

				}
				else {
					console.log("pausing phase 1");
				}

				return percent + phase_p/num_phases;
			},
			complete:function () {

				console.log("calibrate", "reached y boundary");

				reset();

				var grav = g.c.dist/time*1e9;
				g.setGlobalFactor(grav/Math.abs(obj.acceleration.y));

				console.log("complete phase 1");

				phase_p = 0;

				progress.setIndex(2);
				progress.startPhase();
				

			}
		},
		{
			index:2,
			id:"checkY",
			message:"check y axis",
			percent:3/num_phases,
			start:function () {
				console.log("begin phase 2");

				events.dispatch("tiltunder");
				toggleRunning();

				accel.start();

				i = 0;

			},
			update:function (interval, percent) {

				if (running) {

					console.log("running phase 2");

					current.push(accel.getRaw());

					phase_p += 1/1000/100;

					curr = current.pop().y;

				}
				else {
					console.log("pausing phase 2");
				}

				return percent + phase_p/num_phases;
			},
			complete:function () {

				reset();

				if (curr > 0) {

					g.setDirection(yDir, -1);

					console.log("calibrate", "y direction SWITCHED");
					showToast("yDir", "switched");
					
				}
				else if (curr < 0) {
					console.log("calibrate", "y direction SAME");
					showToast("yDir", "same");
				}


				console.log("complete phase 2");

				current.length = 0;
				current = null;
				current = [];
				phase_p = 0;

				progress.setIndex(3);
				progress.startPhase();

			}
		},
		{
			index:3,
			id:"checkX",
			message:"check x axis",
			percent:4/num_phases,
			start:function () {
				console.log("begin phase 3");

				events.dispatch("tiltright");
				toggleRunning();

				accel.start();

				i = 0;

			},
			update:function (interval, percent) {

				if (running) {

					console.log("running phase 3");

					current.push(accel.getRaw());

					phase_p += 1/1000/100;

					curr = current.pop().y;

				}

				return percent + phase_p/num_phases;
			},
			complete:function () {

				reset();

				if (curr < 0) {

					g.setDirection(xDir, -1);

					console.log("calibrate", "y direction SWITCHED");
					showToast("yDir", "switched");
				}
				else if (curr > 0) {
					console.log("calibrate", "y direction SAME");
					showToast("yDir", "same");
				}

				console.log("complete phase 3");

				current.length = 0;
				current = null;
				current = [];
				phase_p = 0;

				progress.setIndex(4);
				progress.startPhase();

			}
		},
		{
			index:4,
			id:"finish",
			message:"finish up calibration",
			percent:5/num_phases,
			start:function() {

				console.log("begin phase 5");
				events.dispatch("tiltnone");
				toggleRunning();

			},
			update:function (interval, percent) {

				var p;

				if (running) {
					console.log("running phase 0");
					p = percent + 0.003;
				}
				else {
					console.log("pausing phase 0");
					p = percent;
				}

				return p;
			},
			complete:function () {

				reset();
				
				console.log("complete phase 5");	

				progress.hardStop();
				events.dispatch("gohome");
			}
		}
		]
	}	

	//var num_phases = 6;
	// var scheme = {
	// 	num:num_phases,
	// 	phases:[
	// 	{
	// 		index:0,
	// 		id:"loading",
	// 		message:"load calibration",
	// 		percent:1/num_phases,
	// 		update:function (percent) {

	// 			return percent + 0.003;
	// 		},
	// 		start:function () {
	// 			console.log("begin phase 0");
	// 		},
	// 		complete:function () {

	// 			console.log("complete phase 0");
	// 			reset();
	// 			events.dispatch("progress-next");
	// 		}
	// 	},
	// 	{
	// 		index:1,
	// 		id:"checkFactor",
	// 		message:"calibrate factor",
	// 		percent:2/num_phases,
	// 		update:function (percent) {
	// 			return percent + getPhasePercent()/num_phases;
	// 		},
	// 		start:function () {
	// 			console.log("begin phase 1");
	// 			time = (new Date()).getTime();
	// 			startCheck();
	// 		},
	// 		complete:function () {
	// 			console.log("complete phase 1");
	// 			reset();
	// 			events.dispatch("progress-next");

	// 		}
	// 	},
	// 	{
	// 		index:2,
	// 		id:"checkY",
	// 		message:"check y axis",
	// 		percent:3/num_phases,
	// 		update:function (percent) {
	// 			return percent + getPhasePercent()/num_phases;
	// 		},
	// 		start:function () {
	// 			console.log("begin phase 2");
	// 			reset();
	// 			events.dispatch("tiltunder");
	// 			events.dispatch("calibrate-pause");
	// 		},
	// 		complete:function () {
	// 			console.log("complete phase 2");
	// 			reset();
	// 			events.dispatch("progress-next");
	// 		}
	// 	},
	// 	{
	// 		index:3,
	// 		id:"checkX",
	// 		message:"check x axis",
	// 		percent:4/num_phases,
	// 		update:function (percent) {
	// 			return percent + getPhasePercent()/num_phases;
	// 		},
	// 		start:function () {
	// 			console.log("begin phase 3");
	// 			events.dispatch("tiltright");
	// 			events.dispatch("calibrate-pause");
	// 		},
	// 		complete:function () {
	// 			console.log("complete phase 3");
	// 			reset();
	// 			//progress.setPercent(4/num_phases);
	// 			events.dispatch("progress-next");
	// 		}
	// 	},
	// 	{
	// 		index:4,
	// 		id:"finish",
	// 		message:"finish calibration",
	// 		percent:5/num_phases,
	// 		update:function (percent) {
	// 			return percent + 0.003;
	// 		},
	// 		start:function () {
	// 			console.log("begin phase 4");
	// 			//loading();
	// 			//events.dispatch("calibrate-start");
	// 		},
	// 		complete:function () {
	// 			console.log("complete phase 4");
	// 			//stopLoading();
	// 			reset();
	// 			//progress.setPercent(5/num_phases);
	// 			events.dispatch("progress-next");
	// 		}
	// 	},
	// 	{
	// 		index:5,
	// 		id:"complete",
	// 		message:"completed calibration, thank you",
	// 		percent:6/num_phases,
	// 		update:function (percent) {
	// 			return getPercent();
	// 		},
	// 		start:function () {
	// 			console.log("begin phase 5");
	// 			events.dispatch("calibrate-start");
	// 			stop();
	// 		},
	// 		complete:function () {

	// 			console.log("complete phase 5");

	// 			setTimeout(function () {
	// 				reset();
	// 				progress.hardStop();
	// 				events.dispatch("calibrate-stop");
	// 				events.dispatch("gohome");
	// 			}, 500);
				
	// 		}
	// 	}
	// 	]
	// }

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