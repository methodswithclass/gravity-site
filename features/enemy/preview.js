enemyModule.directive("preview", ['data.service', 'events', function (data, events) {
		
	return {
		restrict:"E",
		scope:false,
		replace:false,
		templateUrl:"features/enemy/enemy-modal.html",
		link:function ($scope, element, attr) {

			$scope.types = data.enemydata;

			$scope.infowidth = 500*($scope.types.length-1);

			var width = $(window).width()*0.8;
			var height = $(window).height()*0.8;

			if (width > height) width = height;
			else if (height > width) height = width;

			setTimeout(function () {

				$(element[0].querySelector("#previewenemies")).css({width:width, height:height*0.8});
				//$(element[0].querySelector("#infoenemies")).css({width:500*($scope.types.length-1)});
			}, 1000);
			
			$scope.hidemessage = false;
			$scope.hideinfo = $scope.info.id != "enemies";

			$scope.togglemessage = function (action) {

	        	$scope.hidemessage = action == 'hide';
	        }

	        $scope.toggleinfo = function (action) {

	        	$scope.hideinfo = action == 'hide';
	        }

		}
	}

}]);