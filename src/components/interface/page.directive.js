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


            if (isChrome()) {

            	$("arena" + page.id).addClass(u.c.pageHeights.chrome);
            }
            else {
            	$("arena" + page.id).addClass(u.c.pageHeights.regular);
            }

            var $pageBack = $("#page-back-" + page.id);
            var $pageFore = $("#page-fore-" + page.id);

            var setSize = function () {

            	$pageBack = $("#page-back-" + page.id);
            	$pageFore = $("#page-fore-" + page.id);

            	// console.log("page back and fore aspect correct \n\n\n\n\n\n\n", "#page-back-" + page.id, $pageBack, $pageBack[0]);

				ed = u.correctForAspect({
					id:"arena" + page.id,
					factor:0.95, 
					width:$pageBack.width(), 
					height:$pageBack.height(),
					window:false
				})

				console.log("ed result", ed);

				$pageFore.css({width:ed.width + "px", height:ed.height + "px"});

			}

        	setTimeout(function() {

	            manager.addInstance({
	            	id:page.id,
	            	// object:$("#object" + page.id)[0]
	            	arena:$("#arena" + page.id)[0]
	            });

        	}, 300);


        	// setTimeout(function () {

        	// 	setSize();

        	// 	$(window).resize(function () {

        	// 		setSize();
        	// 	})

        	// }, 1200);

		}

	}
}]);