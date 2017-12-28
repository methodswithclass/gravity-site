spaceModule.directive("spaceModal", ['data.service', 'events.service', function (data, events) {
		
	return {
		restrict:"E",
		scope:false,
		replace:false,
		templateUrl:"assets/views/games/space/space-modal.view.html",
		link:function ($scope, element, attr) {
			
			$scope.hidemessage = false;

			$scope.togglemessage = function (action) {

	        	$scope.hidemessage = action == 'hide';
	        }

		}
	}

}]);