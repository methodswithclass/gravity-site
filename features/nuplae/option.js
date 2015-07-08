nuplaeModule.directive("option", ['nuplaeService', 'states', 'events', function (nuServ, states, events) {

	return {
		restrict:'E',
		scope:{
			option:'='
		},
		template:'<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

			$scope.getContentUrl = function() {
				//console.log($scope.view);
                return "features/nuplae/views/option.html"
            }

			var info = $scope.option;

			// nuServ.buttonTouch({
			// 	type:"option",
			// 	name:"option" + info.name,
			// 	back_press:"orange-back",
			// 	back_save:info.menu,
			// 	add_class:"lowered",
			// 	text_press:"white",
			// 	text_save:"white",
			// 	complete:function () {
			// 		states.gotoPage(info.index);
			// 	}
			// });

		}
	}

}]);