interfaceModule.directive("page", ["manager.service", 'utility.service', function (manager, u) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		template:'<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

			var page = $scope.page;

			var ed;

			console.log("in page, name:", page.id, "view:", page.page.view);

			$scope.getContentUrl = function() {
                return "assets/views/" + page.page.view;
            }

            $pageBack = $("#page-back-" + page.id);
            $pageFore = $("#page-fore-" + page.id);

            var setSize = function () {

				ed = u.correctForAspect({
					id:"arena" + page.id,
					factor:0.9, 
					width:$pageBack.width(), 
					height:$pageBack.height(),
					window:false
				})

				$pageFore.css({width:ed.width, height:ed.height});

			}

        	setTimeout(function() {
	            
        		setSize();

        		$(window).resize(function () {

        			setSize();
        		})

	            manager.addInstance({
	            	id:page.id,
	            	// object:$("#object" + page.id)[0]
	            	arena:$("#arena" + page.id)[0]
	            });

        	},500);

		}

	}
}]);