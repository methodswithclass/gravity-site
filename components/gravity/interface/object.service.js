objectModule.directive("object.service", ['send.service', function (send) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		template:"<div class='absolute'></div>",
		link:function ($scope, element, attr) {

			var page = $scope.page;

			send.retrieve.accum({name:"objects", id:'object' + page.id, data:element[0]});
		
		}
	}

}]);