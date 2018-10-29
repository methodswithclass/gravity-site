interfaceModule.directive("page", ["manager.service", 'utility.service', function (manager, u) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		template:'<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {


			var shared = window.shared;
			var g = shared.utility_service;

			var page = $scope.page;

			var ed;

			console.log("in page, name:", page.id, "view:", page.page.view);

			$scope.getContentUrl = function() {
                return "assets/views/" + page.page.view;
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

			var addPageHeight = function () {

				console.log("check height", u.c.pageHeights.regular);


				g.waitForElem({elems:"#arena" + page.id}, function (options) {

					if (g.isMobile() && isChrome()) {

		            	$(options.elems).addClass(u.c.pageHeights.chrome);
		            }
		            else {
		            	$(options.elems).addClass(u.c.pageHeights.regular);
		            }

				})

	        }

	        addPageHeight();

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