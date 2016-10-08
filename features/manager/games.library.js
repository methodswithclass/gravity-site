managerModule.factory("games.library", ["data.service", "enemy.game", 'balance.game', 'space.game', 'calibrate.service', function (data, enemies, balance, space, calibrate) {

	var library = {};


	library["calibrate"] = calibrate;
	library["space"] = space;
	library["enemies"] = enemies;
	library["balance"] = balance;


	return library;


}]);