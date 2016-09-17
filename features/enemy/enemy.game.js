enemyModule.factory("enemy.game", ['enemy.service', 'keeper', 'global', function(Enemy, keeperFactory, g) {

	var total = 5;
	var enemies = [];
	var keeper;
	var timer;
	var arena;

	var createEnemy = function(index) {

		//console.log("create enemy with id: " + index);

		var enemy = new Enemy({
			id:index,
			arena:arena
		});

		enemies.splice(index, 0, enemy);
	}

	var createAll = function () {

		for (var i = 0; i < total; i++) {
			createEnemy(i);
		}

	}

	var destroy = function (index, replace) {

		//console.log("destroy index: " + index);

		enemies[index].remove();
		enemies.splice(index,1);

		if (replace) {
			createEnemy(index);
		}

	}

	var animateDestroy = function (index) {

		var duration = 100;

		//console.log("animate destroy:" + index);

		if (index < enemies.length) {

			setTimeout(function () {

				enemies[index].destroy({duration:600, reduce:0.5, radius:700});

				animateDestroy(index+1);

			}, 50);
			
		}
		else {

			setTimeout(function () {

				for (i in enemies) {
					destroy(i, true);
				}

			}, 500);

			
		}

		

	}

	var update = function (object, interval) {

		//console.log("tick");

		keeper.tick(interval*5);

		var i = 0;
		var length = enemies.length;
		var enemy;
		//var duration = Math.random()*500 + 700;
		
		while (i < length) {

			enemy = enemies[i];

			enemy.update();

			if (enemy.moving && enemy.intersect(object)) {
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

		//console.log("points: " + keeper.getPoints());

	}

	var onCreate = function (input) {

		if (input) arena = input.arena;

		keeper = new keeperFactory();

		keeper.setTotalTime(60000);

		createAll();

	}

	var onEnter = function () {

		

	}

	var onStart = function () {

		keeper.reset();

	}

	var onEnd = function () {

		animateDestroy(0);

	}

	var onLeave = function () {

		keeper.reset();

		while (enemies.length > 0) {
			destroy(0, false);
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