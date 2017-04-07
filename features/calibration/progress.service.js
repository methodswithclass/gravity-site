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

		//console.log("progress percent", _percent);

		percent = _percent;
	}

	var getPercent = function () {

		return percent;
	}

	var setIndex = function(_index) {

		index = _index;
	}

	var progressRunner = function () {

		clearInterval(timer);
		timer = setInterval(function () {
			updateProgress();
		}, interval);
	}

	var updateProgress = function () {

		setPercent(scheme[index].update(interval, percent));

		setMessage(scheme[index].message);
	
		if (percent - scheme[index].percent >= 0.01) { 

			console.log("progress", "complete phase index", index);

			scheme[index].complete();
		}
			
	}

	var loadScheme = function (_scheme) {

		console.log("progress", "load scheme");

		scheme = _scheme.phases;

		max = _scheme.num;
	}

	var startProgress = function () {

		progressRunner();
	}

	var resetUpdate = function () {

		clearInterval(timer);
		timer = {};
		timer = null;
	}

	var startPhase = function () {

		console.log("progress", "run index", index);
		
		scheme[index].start();

	}

	var hardStop = function () {

		console.log("progress", "hard stop and reset");

		index = 0;
		percent = 0;
		percentArray = [];
		resetUpdate();
	}

	return {
		loadScheme:loadScheme,
		startProgress:startProgress,
		startPhase:startPhase,
		setIndex:setIndex,
		setPercent:setPercent,
		getPercent:getPercent,
		getMessage:getMessage,
		hardStop:hardStop
	}	

}]);