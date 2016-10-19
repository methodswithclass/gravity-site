gamesModule.directive("preview", ['data.service', "manager", 'events', 'states', function (data, manager, events, states) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		template:'<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

			var page = $scope.page;

			$scope.getContentUrl = function() {
                return page.type.game ? "features/games/" + page.id + "/" + page.id + "-modal.html" : "";
            }

		}

	}
}]);