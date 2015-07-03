nuplaeModule.directive("option", ['$compile', function ($compile) {

	return {
		scope:{
			info:'='
		},
		link:function ($scope, element, attr) {

			element.html('<div class="relative margin-20 width border text-center {{info.page.menu}}" ng-tap="tapped(info)">{{info.name}}</div>').show();

			$compile(element.contents())($scope);

			$scope.tapped = function (info) {

				alert("tapped " + info.name);

			}

		}
	}

}]);