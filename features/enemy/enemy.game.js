enemyModule.factory("enemy.game", ['enemy.service', 'keeper', function(Enemy, keeperFactory) {

	var total = 30;
	var crowdPercentage = 0.7;
	var enemies = [];
	var keeper;
	var timer;
	var arena;
	var destroyAll = false;

	var create = function(index) {

		console.log("create enemy with id: " + index);

		var enemy = new Enemy({
			id:index,
			type:Math.random() <= crowdPercentage ? 0 : 1,
			arena:arena
		});

		enemies.splice(index, 0, enemy);
	}

	var remove = function (index, replace) {

		enemies[index].remove();
		enemies.splice(index,1);

		if (replace) {
			create(index);
		}

	}

	var update = function (object, interval) {

		//console.log(keeper);

		keeper.tick(interval);

		var i = 0;
		var length = enemies.length;
		var enemy;
		
		while (i < length) {

			enemy = enemies[i];

			enemy.update(remove);

			if (enemy.intersect(object)) {
				keeper.addPoints(enemy.type.reward);
				enemy.destroy();
			}
			else if (enemy.lost()) {
				keeper.addPoints(enemy.type.punish);
				enemy.destroy();
			}

			if (!enemy.active) {
				remove(i, true);
			}

			i++;
		}

	}

	var initialize = function (input) {

		if (input) arena = input.arena;

		keeper = new keeperFactory();

		keeper.setTotalTime(60000);

		for (var i = 0; i < total; i++) {
			create(i);
		}

	}

	var tearDown = function() {

		var timeout = function (stage, time, index) {		
			
			switch(stage) {
				case 0:
				
					setTimeout(function() {
						enemies[index].destroy(false);
						
						index++;
						
						if (index < enemies.length)
							timeout(0, 100, index);
						else
							timeout(1, 500);
						
					}, time);
				
				break;
				
				case 1:
			
					setTimeout(function () {
				
						while (enemies.length > 0) {
							enemies[0].remove();
							enemies.splice(0,1);
						}
						
						timeout(2, 500);
						
					}, time);
					
					break;
					
				case 2:
					
					setTimeout(function () {
				
						initialize();
						
					}, time);
					
					break;
			}
			
		}
		
		timeout(0, 100, 0);

	}

	var tearDown2 = function (back) {
		
		var timeout = function () {

			setTimeout(function () {

				if (enemies.length > 0) {

					console.log("destroy:" + enemies.length);

					enemies[0].destroy(100);

					timer = setInterval(function () {

						enemies[0].update();

						if (!enemies[0].active) {
							remove(0, false);
							clearInterval(timer);
							timer = null;
							timeout();
						}

					}, 10);

				}
				else {
					initialize();
				}

			}, 50);

		}

		if (back) {

			while (enemies.length > 0) {
				remove(0, false);
			}
		}
		else timeout(0);

	}

	var reset = function () {

		keeper.reset();
			
	}


	return {

		initialize:initialize,
		create:create,
		update:update,
		tearDown:tearDown2,
		reset:reset

	}


}]);