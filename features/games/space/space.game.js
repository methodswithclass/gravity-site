spaceModule.factory("space.game", ['keeper', 'global', 'vector', function (keeperFactory, g, vector) {

	var keeper;
	var arena;

	var onCreate = function (input) {

		if (input) arena = input.arena;

		keeper = new keeperFactory();
		keeper.setTotalTime(60000);

	}

	var onEnter = function () {

		

	}

	var onStart = function () {

		keeper.reset();

	}

	var onEnd = function () {

	}

	var onLeave = function () {

		keeper.reset();
	}


	var update = function (object, interval) {

		keeper.tick(interval*3);

		//game update goes here


	}


	var clock = function () {

		return keeper.clock();
	}

	var zeroTime = function () {

		return keeper.zeroTime();
	}

	var points = function () {

		return keeper.getPoints();
	}

	return {

		onCreate:onCreate,
		onEnter:onEnter,
		onStart:onStart,
		onEnd:onEnd,
		onLeave:onLeave,
		update:update,
		clock:clock,
		zeroTime:zeroTime,
		points:points

	}

}]);