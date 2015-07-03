app.directive("option", function () {

	return {
		scope:{
			info:'='
		},
		//templateUrl:'features/nuplae/option.html',
		template:'<div>{{info.name}}</div>',
		link:function ($scope, element, attr) {

			$scope.tapped = function (info) {

				alert("tapped " + info.name);

			}

		}
	}

});