nuplaeModule.directive("option", function () {

	return {
		scope:{
			info:'='
		},
		templateUrl:'features/nuplae/option.html',
		link:function ($scope, element, attr) {

			$scope.tapped = function (info) {

				alert("tapped " + info.name);

			}

		}
	}

});