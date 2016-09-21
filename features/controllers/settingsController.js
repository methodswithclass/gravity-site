controllerModule.controller("SettingsController", ['$scope', 'data.service', function ($scope, data) {
	
	var self = this;

	$scope.info = data.getPageById("settings");

	// self.title = "Settings";


}]);