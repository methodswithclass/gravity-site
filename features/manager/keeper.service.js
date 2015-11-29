managerModule.factory("keeper.service", function () {

	var points = 0;
	var time = 0;

	var totalTime = 0;
	

	var addPoints = function(_points) {

		points += points;
	}

	var getPoints = function () {

		return points;
	}

	var setTotalTime = function (_time) {

		totalTime = _time;
	}

	var tick = function () {

		time += 1;
	}

	var getTime = function () {

		return totalTime - time;
	}

	var reset = function () {

		points = 0;
		time = 0;
		totalTime = 0;

	}

	return {

		addPoints:addPoints,
		getPoints:getPoints,
		setTotalTime:setTotalTime,
		tick:tick,
		getTime:getTime,
		reset:reset
	}

});