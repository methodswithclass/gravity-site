calibrateModule.factory("progress.service", ['events', function (events) {

	var percentArray = [];
	var percent = 0;
	var messagetext = "";

	var scheme;
	var running = false;
	var index = 0;
	var max = 0;
	var interval = 10;
	var timer;

	var setMessage = function(message) {
		messagetext = message;
	}

	var getMessage = function () {
		return messagetext;
	}

	var setPercent = function (_percent) {

		//percentArray[percentArray.length] = _percent;

		//percent = Math.max(...percentArray);

		percent = _percent;

		console.log("progress", "percent", percent);
	}

	var getPercent = function () {

		return percent;
	}

	var toggleRunning = function (_running) {

		console.log("progress", _running ? "start" : "pause");

		running = _running;
	}

	var runScheme = function () {

		clearInterval(timer);
		timer = setInterval(function () {
			//console.log("run phase timer");
			if (running){
				//console.log("run index", index);
				updateProgress();
			}
		}, interval);
	}

	var updateProgress = function () {

		setPercent(scheme[index].update(percent));

		setMessage(scheme[index].message);
	
		if (percent >= scheme[index].percent) {

			console.log("progress", "complete phase index", index);

			scheme[index].complete();
		}
			
	}

	var loadScheme = function (_scheme) {

		console.log("progress", "load scheme");

		scheme = _scheme.phases;

		max = _scheme.num;
	}

	var resetUpdate = function () {

		clearInterval(timer);
		timer = {};
		timer = null;
	}

	var runPhase = function () {

		console.log("progress", "run phase");
		
		//toggleRunning(true);
		scheme[index].start();

	}

	var hardStop = function () {

		console.log("progress", "hard stop and reset");

		index = 0;
		percent = 0;
		percentArray = [];
		toggleRunning(false);
		resetUpdate();
		events.dispatch("calibrate-stop");
	}

	events.on("progress-start", function () {

		console.log("progress", "start phase", index);

		toggleRunning(true);
		runPhase();

	});

	events.on("progress-stop", function () {

		toggleRunning(false);
	});

	events.on("progress-next", function () {

		//console.log("progress continues");

		if (index < max) {

			index++;

			events.dispatch("progress-start");
		}

	});

	return {
		loadScheme:loadScheme,
		runScheme:runScheme,
		setPercent:setPercent,
		getPercent:getPercent,
		getMessage:getMessage,
		hardStop:hardStop
	}	

}]);