gamesModule.factory("keeper", function () {


	var keeper = function () {

		var self = this;

		var points = 0;
		var time = 0;

		//set total time to non-zero for count down, otherwise it counts up
		var totalTime = 0;

		self.addPoints = function(_points) {

			points += _points;
		}

		self.getPoints = function () {

			return points;
		}

		self.setTotalTime = function (_time) {

			totalTime = _time;
		}

		self.tick = function (_tick) {

			time += _tick;
		}

		self.getTime = function () {

			return totalTime - time;
		}

		self.timeToString = function () {

			var time = Math.abs(self.getTime());

			var minutesDec = time/1000/60;
			var minutes = Math.floor(minutesDec);
			var secondsDec = minutesDec - minutes;
			var seconds = Math.floor(secondsDec*60);

			return utility.resolveDigit(minutes) + ":" + utility.resolveDigit(seconds);

		}

		self.reset = function () {

			points = 0;
			time = 0;

		}

	}

	return keeper;

});