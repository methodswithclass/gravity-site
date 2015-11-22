managerModule.factory("manager", ["accelerometer", "object.service", function (accelerometer, objectFact) {

	var object;
	var accel;

	var createInstance = function (parent, element) {

		console.log("create instance");

		object = new objectFact({
			parent:parent, 
			element:element
		});
			
		accel = new accelerometer({
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

	}

	var destroyInstance = function () {

		console.log("destory instance");

		object = {};
		object = null;

		accel = {};
		accel = null;
	}

	var start = function () {

		accel.start();
	}

	var stop = function () {

		accel.stop();
	}


	return {
		createInstance:createInstance,
		destroyInstance:destroyInstance,
		start:start,
		stop:stop
	}

}]);