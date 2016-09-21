controllerModule.controller("InvalidController", ['$scope', 'global', '$stateParams', 'data.service', function ($scope, g, $stateParams, data) {

	$scope.getContentUrl = function() {

	    var view = "invalid.html";

	    return 'features/views/' + view;
	}

}])