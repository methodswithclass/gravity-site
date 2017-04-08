interface.module.directive("page", ["manager.service", function (manager) {

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

        	setTimeout(function() {
	            
	            manager.addInstance({
	            	id:page.id,
	            	object:$("#object" + page.id)[0]
	            });

        	},500);

		}

	}
}]);