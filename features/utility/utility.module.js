angular.module("utility.module", ['sharedModule', 'accelModule'])


.factory("utility", ['vector', function (vector) {

	var factor = 1;
	var yDir = 1;
	var xDir = 1;

	var con = {
		playAsset:"img/play.png",
		stopAsset:"img/stop.png",
		backAsset:"img/back.png",
		loadingAsset:"img/loading.png",
		landClockwise:"landClockwise",
		portrait:"portrait",
		circle:"circle",
		square:"square",
		cross:"cross",
		annihilate:"annihilate",
		remove:"remove",
		homeIndex:0,
		calibrateIndex:1,
		gravIndex:2,
		floatIndex:3,
		enemiesIndex:4,
		balanceIndex:5,
		spaceIndex:6,
		back:"back",
		body:"body",
		option:"option",
		home:"home",
		dist:20
	}

	var setFactor = function (_factor) {

		//console.log("factor is " + _factor);

		factor = _factor;
	}

	var setDirection = function (direction, value) {

		//console.log(direction + " value is " + value);

		if (direction == "i") {
			xDir = value;
		}
		else if (direction == "j") {
			yDir = value;
		}

	}

	var getFactor = function () {

		return factor;
	}

	var getDirection = function (direction) {

		return direction == "i" ? xDir : yDir;
	}

	var isValid = function () {

		//console.log($location.url());

		if ($location.url() == "/valid") {	
			return true;
		}

		return false;

	}

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

		if (one.shape == con.square || two.shape == con.square) {
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

	var overlapShape = function (one, two, margin) {

		var oneVector = new vector(one.position.x + one.radius, one.position.y + one.radius, 0);
		var twoVector = new vector(two.position.x + two.radius, two.position.y + two.radius, 0);
		
		var diff = oneVector.subtract(twoVector);
		
		//console.log("length: " + diff.len() + "radius: " + one.radius + " radius: " + two.radius);

		if (diff.len() < one.radius - two.radius + margin) {
			return true;	
		}
		else {
			
			return false;	
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
		c:con,
		setFactor:setFactor,
    	setDirection:setDirection,
    	getFactor:getFactor,
    	getDirection:getDirection,
    	isValid:isValid,
		average:average,
		truncate:truncate,
		getRandomPosition:getRandomPosition,
		getRandomVelocity:getRandomVelocity,
		resolveDigit:resolveDigit,
		len:len,
		intersectShape:intersectShape,
		intersectRect:intersectRect,
		overlapShape:overlapShape,
		getDestroyPosition:getDestroyPosition
	}

}]);