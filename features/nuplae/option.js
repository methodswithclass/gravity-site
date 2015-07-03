nuplaeModule.directive("option", function () {

	return {
		scope:{
			info:'='
		},
		template:'<div class="relative width80 border {{info.page.menu}}" ng-tap="onTap(info)">',
		link:function ($scope, element, attr) {

			$scope.onTap = function (info) {

				alert("tapped " + info.name);

			}

		}
	}

});