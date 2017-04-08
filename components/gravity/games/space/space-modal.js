spaceModule.directive("space.modal", ['data.service', 'events.service', function (data, events) {
		
	return {
		restrict:"E",
		scope:false,
		replace:false,
		templateUrl:"features/games/space/space-modal.html",
		link:function ($scope, element, attr) {
			
			$scope.hidemessage = false;

			$scope.togglemessage = function (action) {

	        	$scope.hidemessage = action == 'hide';
	        }

		}
	}

}]);