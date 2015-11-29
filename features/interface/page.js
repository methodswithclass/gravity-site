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
                return 'features/interface/views/' + $scope.view;
            }

            var info = $scope.info;

        	if (info.name == "Calibrate") {

        		$("#toggleCalibrate").addClass("hidden");
        		//$("#objectCalibrate").addClass("hidden");

        		events.on("leave", function () {
	      			states.gotoPage(0);
	      		});

        		setTimeout(function() {
	            	calibrate.init($("#arenaCalibrate")[0], $("#objectCalibrate")[0]);
	      		}, 500);
            }
            else {
            	setTimeout(function() {
		            
		            manager.addInstance({
		            	name:info.name, 
		            	parent:$("#arena" + info.name)[0], 
		            	object:$("#object" + info.name)[0], 
		            	deviceinput:true
		            });

	        	},500);	
	        }

		}

	}
}]);