nuplaeModule.directive("option", function () {

	return {
		scope:{
			info:'='
		},
		template:'<div class="relative margin-20 width80 border text-center {{info.page.menu}}" ng-tap="tapped(info)">{{info.name}}</div>',
		link:function ($scope, element, attr) {

			$scope.tapped = function (info) {

				alert("tapped " + info.name);

			}

		}
	}

});