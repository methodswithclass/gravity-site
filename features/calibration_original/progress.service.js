calibrateModule.factory("progress.service", function () {

	var percentArray = [];
	var percent = 0;
	var messagetext = "";

	var scheme;
	var loading = false;
	var stopped = true;
	//var index = 0;
	var max = 0;
	var interval = 10;
	var phasedelay = 1500;
	var timer;

	var setMessage = function(message) {
		messagetext = message;
	}

	var getMessage = function () {
		return messagetext;
	}

	var setPercent = function (_percent) {

		percentArray[percentArray.length] = Math.floor(_percent);

		percent = Math.max(...percentArray);

		console.log("progress", "percent", percent);
	}

	var getPercent = function () {

		return percent;
	}

	var resetTimer = function () {

		clearInterval(timer);
		timer = null;
	}

	var reset = function () {

		console.log("progress", "clear");

		resetTimer();
		index = 0;
		percent = 0;
		percentArray = [];
	}

	var start = function () {

		console.log("progress", "start");

		stopped = false;
	}

	var stop = function () {

		console.log("progress", "stop");

		stopped = true;
	}

	var runPhase = function (index) {

		console.log("progress", "run index", index);

		scheme[index].start();

		timer = setInterval(function () {
			if (!stopped){
				updateProgress(index);
			}
		}, interval);
	}

	var updateProgress = function (index) {

		//console.log("progress", "update index", index, "percent", percent);

		setPercent(scheme[index].update(percent));

		setMessage(scheme[index].message);
	
		if (percent >= scheme[index].percent) {

			console.log("progress", "complete index", index);

			scheme[index].complete();

			stop();
			resetTimer();

			if (index < max) {
				
				setTimeout(function () {
					start();
					runPhase(index + 1);
				}, phasedelay);
			}
		}
			
	}

	var loadScheme = function (_scheme) {

		console.log("progress", "load scheme");

		scheme = _scheme;

		max = scheme.length-1;
		
	}

	var runScheme = function () {

		console.log("progress", "run scheme");

		reset();

		start();

		runPhase(0);

		
	}

	return {
		loadScheme:loadScheme,
		runScheme:runScheme,
		getPercent:getPercent,
		getMessage:getMessage,
		reset:reset
	}

});