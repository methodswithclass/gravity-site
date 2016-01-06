uiModule.directive("page", ["manager", 'calibrate.service', 'events', 'states', function (manager, calibrate, events, states) {

	return {
		restrict:'E',
		scope:{
			info:'=',
			view:'@'
		},
		template:'<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

			//console.log("name: " + $scope.info.name + " view: " + $scope.view);

			$scope.getContentUrl = function() {
				//console.log($scope.view);
                return 'features/views/' + $scope.view;
            }

            var info = $scope.info;

        	if (info.id == "calibrate") {

        		$("#togglecalibrate").addClass("hidden");
        		//$("#objectCalibrate").addClass("hidden");

        		events.on("leave", function () {
	      			states.go("page.home");
	      		});

        		setTimeout(function() {
	            	calibrate.init($("#arenacalibrate")[0], $("#objectcalibrate")[0]);
	            	calibrate.start();
	      		}, 500);
            }
            else if (info.id != "home") {
            	setTimeout(function() {
		            
		            manager.addInstance({
		            	id:info.id, 
		            	parent:$("#arena" + info.id)[0], 
		            	object:$("#object" + info.id)[0], 
		            	deviceinput:true
		            });

	        	},500);	
	        }

		}

	}
}]);