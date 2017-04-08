gamesModule.factory("time-keeper.service", [function () {
	
	var utility = mcshared.utility;

	var keeper = function () {

		var self = this;

		var points = 0;
		var time = 0;

		//set total time to non-zero for count down, otherwise it counts up
		var totalTime = 0;

		var pointTimer;

		self.addPoints = function(_points) {

			points = Math.floor(points);

			if (Math.abs(_points) < 1) {
				points += (points > 0 ? 1 : -1)*points*_points;
			}
			else points += _points;

		}

		self.getPoints = function () {

			//console.log("points raw: " + points);

			var pts = Math.floor(points);
			var sign = Math.abs(pts)/pts;
			var pointStr = Math.abs(pts) + "";
			var threeArray = [];

			var thousands = Math.floor(pointStr.length / 3);
			var remainder = pointStr.length % 3;
			var j = 0;
			var k;

			if (remainder != 0) {
				thousands++;
				threeArray[0] = pointStr.substr(0, remainder);
				j = 1;
			}

			for (var i = j; i < thousands; i++) {

				if (remainder != 0)	k = i-1;
				else k = i;

				threeArray[i] = pointStr.substr(remainder + k*3,3);
			}

			return (sign < 0 ? "-" : "") + threeArray.join(",");
		}

		self.setTotalTime = function (_time) {

			totalTime = _time;
		}

		self.tick = function (_tick) {

			time += Math.floor(_tick);

			//console.log("keeper time", time);
		}

		self.time = function () {

			return totalTime - time;
		}

		self.zeroTime = function () {

			return Math.abs(self.time()) < 1000;
		}

		self.clock = function () {

			var time = Math.abs(self.time());

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

}]);