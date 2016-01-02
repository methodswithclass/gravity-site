managerModule.factory("games.library", ["data.service", "enemy.game", 'balance.game', function (data, enemies, balance) {

	var library = {};

	library["enemies"] = enemies;
	library["balance"] = balance;


	return library;


}]);