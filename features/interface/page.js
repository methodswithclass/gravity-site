uiModule.directive("page", ["manager", 'events', 'states', function (manager, events, states) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		template:'<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

			var page = $scope.page;

			console.log("in page, name:", page.id, "view:", page.page.view);

			$scope.getContentUrl = function() {
                return 'views/page/' + page.page.view;
            }

         	if (page.type.accel) {
            	setTimeout(function() {
		            
		            manager.addInstance({
		            	id:page.id, 
		            	parent:$("#arena" + page.id)[0], 
		            	object:$("#object" + page.id)[0]
		            });

	        	},500);
	        }

		}

	}
}]);