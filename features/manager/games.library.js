managerModule.factory("games.library", ["data.service", "enemy.game", 'balance.game', 'space.game', 'calibrate.service', 'settings.service', function (data, enemies, balance, space, calibrate, settings) {

	var library = {};


	library["settings"] = settings;
	library["calibrate"] = calibrate;
	library["space"] = space;
	library["enemies"] = enemies;
	library["balance"] = balance;


	return library;


}]);