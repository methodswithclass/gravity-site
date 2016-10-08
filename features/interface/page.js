uiModule.directive("page", ["manager", 'calibrate.service', 'events', 'states', function (manager, calibrate, events, states) {

	return {
		restrict:'E',
		scope:{
			info:'=',
			view:'@'
		},
		template:'<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

			console.log("in page, name:", $scope.info.id, "view:", $scope.view);

			$scope.getContentUrl = function() {
                return 'views/' + $scope.view;
            }

            var info = $scope.info;

        	// if (info.id == "calibrate") {

        	// 	//$("#togglecalibrate").addClass("hidden");
        	// 	//$("#objectCalibrate").addClass("hidden");

        	// 	setTimeout(function() {
        	// 		console.log("page directive", "run calibration");
	        //     	calibrate.init($("#arenacalibrate")[0], $("#objectcalibrate")[0]);
	        //     	calibrate.start();
	      		// }, 500);
         //    }
         //    else 
         	if (info.id != "home") {
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