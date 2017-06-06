managerModule.factory("games.library", ["data.service", "enemy.game", 'balance.game', 'space.game', 'calibrate.service', 'settings.service', function (data, enemy, balance, space, calibrate, settings) {

	var library = {};


	library["settings"] = settings;
	library["calibrate"] = calibrate;
	library["space"] = space;
	library["enemy"] = enemy;
	library["balance"] = balance;


	return library;


}]);