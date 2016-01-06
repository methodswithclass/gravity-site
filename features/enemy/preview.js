enemyModule.directive("preview", ['data.service', function (data) {
		
	return {
		restrict:"E",
		scope:false,
		replace:false,
		templateUrl:"features/enemy/enemy-modal.html",
		link:function ($scope, element, attr) {

			$scope.types = data.enemydata;

            $scope.dismiss = function () {

                $(element).hide();

            }

		}
	}

}]);