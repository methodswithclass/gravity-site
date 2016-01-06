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

	        var showInfo = document.createElement("div");
	        $(showInfo).addClass("absolute width-100 height-100 black-back rounded50 right-20 bottom30 pointer");
	        if (info.id == "enemies"){
	        	$(element).append(showInfo);
	        }

	        $(showInfo).on("click", function () {

	        	events.dispatch("showinfo");

	        });






		}

	}
}]);