accelModule.factory("utility", ["vector", function (vector) {

	var average = function (array) {

		var sumX = 0;
		var sumY = 0;
		
		for (i in array) {
			sumX += array[i].x;
			sumY += array[i].y;
		}
		
		return new vector(sumX/array.length, sumY/array.length, array[array.length-1].time);
	}

	var truncate = function (number, decimal) {
	
		var value = Math.floor(number*Math.pow(10, decimal))/Math.pow(10, decimal);
		
		return value;
	}

	return {
		average:average,
		truncate:truncate
	}

}]);