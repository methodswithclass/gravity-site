managerModule.factory("games.library", ["data.service", "enemy.game", 'balance.game', 'space.game', function (data, enemies, balance, space) {

	var library = {};


	library["space"] = space;
	library["enemies"] = enemies;
	library["balance"] = balance;


	return library;


}]);