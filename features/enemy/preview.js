enemyModule.directive("preview", ['data.service', 'events', function (data, events) {
		
	return {
		restrict:"E",
		scope:false,
		replace:false,
		templateUrl:"features/enemy/enemy-modal.html",
		link:function ($scope, element, attr) {

			$scope.types = data.enemydata;

			var width = $(window).width()*0.9;
			var height = $(window).height()*0.7;

			if (width > height) width = height;
			else if (height > width) height = width;

			setTimeout(function () {

				$(element[0].querySelector("#previewenemies")).css({width:width*1.2, height:height});
			}, 1000);
			
			$scope.hideinfo = $scope.info.id != "enemies";

	        $scope.setShow = function (_show) {

	        	$scope.hideinfo = _show;
	        }

		}
	}

}]);