calibrateModule.factory("progress.service", function () {

	var percentArray = [];
	var percent = 0;
	var messagetext = "";

	var scheme;
	var loading = false;
	var stopped = true;
	var index = 0;
	var max = 0;
	var interval = 10;
	var phasedelay = 1500;
	var timer;

	var setPercent = function (_percent) {

		percentArray[percentArray.length] = _percent;

		percent = Math.max(...percentArray)*100;
	}

	var getPercent = function () {

		return percent;
	}

	var message = function() {
		return messagetext;
	}

	var reset = function () {

		console.log("clear progress");

		clearInterval(timer);
		timer = null;
		index = 0;
		percent = 0;
		percentArray = [];
	}

	var start = function () {

		console.log("start progress");

		stopped = false;
	}

	var stop = function () {

		console.log("stop progress");

		stopped = true;
	}

	var processload = function () {

		timer = setInterval(function () {
			if (!stopped){
				//console.log("process");
				updateProgress();
			}
		}, interval);
	}

	var completeload = function (complete) {

		console.log("completeload " + index);

		stop();

		if (complete) {

			setTimeout(function () {

				complete();

			}, phasedelay);
		}
	}

	var updateProgress = function () {

		console.log("index", index, "percent", percent);

		if (index == 0) {
			messagetext = scheme[index].message;

			scheme[index].complete();

			index++;
		}
		else if (percent == scheme[index].percent) {

			messagetext = scheme[index].message;

			scheme[index].complete();

			if (index < max) {

				index++;

				completeload(function () {
					start();
				});
			}
			
		}
			
	}

	var loadScheme = function (_scheme) {

		console.log("progress load scheme");

		scheme = _scheme;

		max = scheme.length-1;

		start();

		processload();

		
	}

	var runScheme = function () {

		console.log("progress run scheme");

		reset();

		start();

		processload();

		
	}

	return {
		loadScheme:loadScheme,
		runScheme:runScheme,
		setPercent:setPercent,
		getPercent:getPercent,
		message:message,
		reset:reset
	}

});