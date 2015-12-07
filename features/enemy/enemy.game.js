enemyModule.factory("enemy.game", ['enemy.service', 'keeper', function(Enemy, keeperFactory) {

	var total = 30;
	var id = 0;
	var crowdPercentage = 0.7;

	var enemies = [];
	var keeper;

	var timer;

	var interval = 10;

	var arena;

	// var getUniqueId = function () {

	// 	var id = 0;

	// 	for (i = 0; i < enemies.length; i++) {
	// 		if (i != enemies[i].id) {
	// 			id = i;
	// 		}
	// 	}

	// 	if (i == enemies.length) {
	// 		id = i;
	// 	}

	// 	console.log("create enemy with id: " + id);

	// 	return id;
	// }

	// var remove = function (index) {
			
	// 	var i = 0;
	// 	while (i < enemies.length) {
	// 		if (enemies[i].id == index) {
	// 			enemies.splice(i,1);
	// 			break;
	// 		}
	// 		i++;
	// 	}
	// }

	var create = function(index, replace) {

		console.log("create enemy with id: " + index);

		if (replace) enemies.splice(index,1);

		var typeIndex = Math.random();

		if (typeIndex <= crowdPercentage) {
			typeIndex = 0;
		}
		else typeIndex = 1;

		var enemy = new Enemy({
			id:index,
			type:typeIndex,
			destroy:true,
			arena:arena
		});

		enemies.splice(index, 0, enemy);

	}

	var update = function (object, interval) {

		//console.log(keeper);

		keeper.tick(interval);

		var i = 0;
		var length = enemies.length;
		
		while (i < length) {
			enemies[i].update(object, create, keeper);
			i++;
		}

	}

	var initialize = function (input) {

		arena = input.arena;

		keeper = new keeperFactory();

		keeper.setTotalTime(60000);

		for (var i = 0; i < total; i++) {
			create(i, false);
		}

	}

	var tearDown = function() {

		var timeout = function (stage, time, index) {		
			
			switch(stage) {
				case 0:
				
					setTimeout(function() {
						enemies[index].destroy(keeper, null, null);
						
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

	var reset = function () {

		keeper.reset();
			
	}


	return {

		initialize:initialize,
		create:create,
		update:update,
		tearDown:tearDown,
		reset:reset

	}


}]);