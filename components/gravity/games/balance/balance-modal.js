balanceModule.directive("balanceModal", ['data.service', 'events.service', function (data, events) {
		
	return {
		restrict:"E",
		scope:false,
		replace:false,
		templateUrl:"features/games/balance/balance-modal.html",
		link:function ($scope, element, attr) {
			
			$scope.hidemessage = false;

			$scope.togglemessage = function (action) {

	        	$scope.hidemessage = action == 'hide';
	        }

		}
	}

}]);