managerModule.factory("games.library", ["data.service", "enemy.game", function (data, enemies) {

	var library = {};

	library[data.pages[3].name] = enemies;

	return library;


}]);