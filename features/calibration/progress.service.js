calibrateModule.factory("progress.service", ['events', function (events) {

	var percentArray = [];
	var percent = 0;
	var messagetext = "";

	var scheme;
	var stopped = true;
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

		percentArray[percentArray.length] = _percent;

		percent = Math.max(...percentArray);

		console.log("progress", "percent", percent);
	}

	var getPercent = function () {

		return percent;
	}

	var start = function () {

		console.log("progress", "start");

		stopped = false;
	}

	var pause = function () {

		console.log("progress", "pause");

		stopped = true;

		//events.dispatch("calibrate-pause");
	}

	var runPhase = function () {

		console.log("progress", "run phase index", index);

		scheme[index].start();

		clearInterval(timer);
		timer = setInterval(function () {
			//console.log("run phase timer");
			if (!stopped){
				//console.log("run phase update");
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

		scheme = _scheme;

		max = scheme.length-1;
		
	}

	var resetUpdate = function () {

		//pause();
		clearInterval(timer);
		timer = {};
		timer = null;
	}

	var hardStop = function () {

		console.log("progress", "hard stop and reset");

		index = 0;
		percent = 0;
		percentArray = [];
		resetUpdate();
		events.dispatch("calibrate-stop");
	}

	events.on("progress-start", function () {

		console.log("progress", "start phase");

		start();
		runPhase();
	})

	events.on("progress-stop", function () {

		//updateProgress();
		pause();
		resetUpdate();
	});

	events.on("progress-next", function () {

		console.log("progress continues");

		if (index < max) {

			index++;

			events.dispatch("progress-start");

		}

	});

	return {
		loadScheme:loadScheme,
		//runScheme:runScheme,
		setPercent:setPercent,
		getPercent:getPercent,
		getMessage:getMessage,
		hardStop:hardStop
	}	

}]);