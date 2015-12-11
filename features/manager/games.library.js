managerModule.factory("games.library", ["data.service", "enemy.game", 'balance.game', function (data, enemies, balance) {

	var library = {};

	library[data.pages[3].name] = enemies;
	library[data.pages[4].name] = balance;


	return library;


}]);