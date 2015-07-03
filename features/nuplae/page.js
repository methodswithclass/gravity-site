nuplaeModule.directive("page", function () {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		template:'<div ng-include="getContentUrl()"></div>'
		link:function ($scope, element, attr) {


			$scope.getContentUrl = function() {

				var view =  $scope.info.page.view;

				console.log(view);

                return 'features/nuplae/' + view;
            }

            var init = function () {

            	if ($scope.info.name == "Home") {

			    	var home;

			    	var body;

			    	var complete = function () {

			    		console.log("loaded");

			    		var body = $("#body");

						console.log(home[0]);

						console.log(body[0]);

						body.animate({top:0, left:"25%"},10);
			    	}

			    	var timer = setInterval(function () {

			    		home = $("#pageHome");

			    		if (home[0]) {
			    			clearInterval(timer);
			    			complete();
			    		}

			    	}, 10);

		    	}
		    }

		    init();


		}

	}
});