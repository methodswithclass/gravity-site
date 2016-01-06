enemyModule.directive("preview", ['data.service', 'events', function (data, events) {
		
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

            $scope.show = function () {

            	console.log("info showed");

            	$(element).show();
            }

           	events.on("showinfo", function () {

           		console.log("show info");

           		$scope.show();
           		
           	});

		}
	}

}]);