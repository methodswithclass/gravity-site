sharedModule.factory("utility", ["vector", 'global', function (vector, g) {

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

	var getRandomPosition = function (arena) {
		var side = Math.random();
		var loc = Math.random();

		var distance = 200;
		
		if (side < 0.25) { //top
			return new vector(loc*$(arena).width(), -distance,0);
		}
		else if (side < 0.5) { //right
			return new vector($(arena).width() +distance, loc*$(arena).height(), 0);
		}
		else if (side < 0.75 ) { //bottom
			return new vector(loc*$(arena).width(), $(arena).height() + distance, 0);
		}
		else if (side < 1) { //left
			return new vector(-distance, loc*$(arena).height(), 0);
		}
		
	}

	var getRandomVelocity = function (arena, pos) {
		
		var marginY = 100;
		var marginX = 50;
		var spread = 20;
		var minimum = 40;
		
		var box = {top:marginY, left:marginX, width:$(arena).width() - 2*marginX, height:$(arena).height() - 2*marginY};
		
		var topRand = Math.random();
		var leftRand = Math.random();
		var speed = spread*Math.random() + minimum;
		
		var end = new vector(leftRand*box.width + box.left, topRand*box.height + box.top, 0);
		
		var velocity = end.subtract(pos).unit();
		
		return velocity.multiply(speed);
		
	}

	var getDestroyPosition = function (pos, i) {
		return pos[i];
	}

	var intersectRect = function (one, two) {
		var r1 = {};
		var r2 = {};
		
		
		
		r1.left = $(one).position().left;
		r1.right = r1.left + $(one).width();
		r1.top =  $(one).position().top;
		r1.bottom = r1.top + $(one).height();
		
		r2.left = $(two).position().left;
		r2.right = r2.left + $(two).width();
		r2.top =  $(two).position().top;
		r2.bottom = r2.top + $(two).height();
		
		
		var result = !(r2.left >= r1.right || 
	           r2.right <= r1.left || 
	           r2.top >= r1.bottom ||
	           r2.bottom <= r1.top);
		
	  return result;
	}

	var intersectShape = function (one, two) {

		if (one.shape == g.c.square || two.shape == g.c.square) {
			return intersectRect(one.el(), two.el());	
		}
		else {
			
			var onevector = new vector(one.position.x + one.radius, one.position.y + one.radius, 0);
			var twovector = new vector(two.position.x + two.radius, two.position.y + two.radius, 0);
			
			var diff = onevector.subtract(twovector);
			
			if (diff.len() < one.radius + two.radius) {
				return true;	
			}
			else {
				
				return false;	
			}
				
		}
		
		
	}

	var resolveDigit = function (digit) {
		if (digit < 10) {
			return "0" + digit;	
		}
		else {
			return "" + digit;	
		}
	}

	var len = function (vector) {

		return Math.sqrt(vector.x*vector.x + vector.y * vector.y + vector.z * vector.z);
	}

	return {
		average:average,
		truncate:truncate,
		getRandomPosition:getRandomPosition,
		getRandomVelocity:getRandomVelocity,
		resolveDigit:resolveDigit,
		len:len,
		intersectShape:intersectShape,
		intersectRect:intersectRect,
		getDestroyPosition:getDestroyPosition
	}

}]);