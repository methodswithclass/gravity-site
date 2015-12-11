balanceModule.factory("balance.game", ['target.service', 'keeper', 'global', 'vector', 'meter', function (Target, keeperFactory, g, vector, meterFactory) {

	var keeper;
	var arena;
	var target;
	var targetPosition = {x:0, y:0};
	var targetRadius = 150;
	var meter;

	var onCreate = function (input) {

		if (input) arena = input.arena;

		keeper = new keeperFactory();
		keeper.setTotalTime(60000);

		meter = new meterFactory({
			parent:arena,
			max:10000,
			start:2000
		});

		target = new Target({
			parent:arena,
			size:targetRadius*2,
			position:targetPosition
		});

	}

	var onEnter = function () {

		

	}

	var onStart = function () {

		keeper.reset();
		meter.reset();
		target.show();

	}

	var onEnd = function () {

		target.hide();
		target.reset();

	}

	var onLeave = function () {

		keeper.reset();
		meter.reset();
	}


	var update = function (object, interval) {

		//console.log(keeper);

		keeper.tick(interval);

		if (target.active) {

			if (target.overlap(object)) {
				meter.tick(-1*interval);
				keeper.addPoints(144);
			}
			else {
				meter.tick(interval);
				keeper.addPoints(-22);
			}

			target.finish(meter.check(), function () {

				meter.reset();
			});
		}

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