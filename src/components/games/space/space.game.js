spaceModule.factory("space.game", ['time-keeper.service', 'enemy.service', function (keeperFactory, Enemy) {

	var keeper;
	var arena;
	var targets = [];
	var total = 3;


	var createTarget = function (index) {

		var target = new Enemy({
			id:"space",
			index:index,
			arena:arena
		})


		targets.splice(index, 0, target);
	}


	var createAll = function () {

		for (var i = 0; i < total; i++) {
			createTarget(i);
		}

	}

	var destroy = function (index, replace) {

		//console.log("destroy index: " + index);

		if (targets[index]) {
			targets[index].remove();
			targets.splice(index,1);

			// if (replace) {
			// 	createTarget(index);
			// }

			if (targets.length == 0) {

				createAll();
			}
		}

	}

	var animateDestroy = function (index) {

		var duration = 100;

		//console.log("animate destroy:" + index);

		if (index < targets.length) {

			setTimeout(function () {

				if (targets[index]) targets[index].destroy({duration:600, reduce:0.5, radius:700});

				animateDestroy(index+1);

			}, 50);
			
		}
		else {

			setTimeout(function () {

				for (i in targets) {
					destroy(i, true);
				}

			}, 100);

			
		}

		

	}

	var onCreate = function (input) {

		if (input) arena = $(input.object.el()).parent();

		keeper = new keeperFactory();
		keeper.setTotalTime(60000);

	}

	var onEnter = function () {

		createAll();

	}

	var onStart = function () {

		keeper.reset();

	}

	var onEnd = function () {

		animateDestroy(0);
	}

	var onLeave = function () {

		keeper.reset();

		while (targets.length > 0) {
			destroy(0, false);
		}
	}

	var reset = function () {

		
	}


	var update = function (object, interval) {

		keeper.tick(interval);

		var i = 0;
		var length = targets.length;
		var enemy;
		//var duration = Math.random()*500 + 700;
		
		while (i < length) {

			enemy = targets[i];

			enemy.update();

			if (enemy.moving && enemy.aimed(object)) {
				//console.log("hit", enemy.type.reward);
				keeper.addPoints(enemy.type.hit);
				enemy.destroy({
					index:i, 
					complete:function (index) {
						destroy(index, true);
					}
				});
			}
			else if (enemy.moving && enemy.lost()) {
				//console.log("miss", enemy.type.punish);
				keeper.addPoints(enemy.type.miss);
				destroy(i, true);
			}

			i++;
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
		reset:reset,
		update:update,
		clock:clock,
		zeroTime:zeroTime,
		points:points

	}

}]);