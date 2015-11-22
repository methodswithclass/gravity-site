objectModule.directive("object", ["accelerometer", "object.service", function (accelerometer, objectFact) {

	return {
		scope:false,
		replace:true,
		restrict:'E',
		templateUrl:"features/object/object.html",
		link:function ($scope, element, attr) {

			var object = new objectFact({
				parent:$("#" + attr.parent)[0], 
				element:element[0]
			});
			
			var accel = new accelerometer({
				params:{
					interval:1/300,
					filterSize:3,
					factor:1,
					mu:0.1,
					damp:0.4,
					gravity:true,
					bounce:true
				},
				element:object
			});

			object.show();

			accel.setinitial(0,0);


			accel.getMotion(function (position, velocity, acceleration) {
					
				object.setPosition(position);
				object.setVelocity(velocity);
				object.setAcceleration(acceleration);

			});

			window.ondevicemotion = accel.motion;

			// $scope.start = function () {

			// 	accel.start();
			// }

			// $scope.stop = function () {

			// 	accel.stop();
			// }

			accel.start();
		}
	}

}]);