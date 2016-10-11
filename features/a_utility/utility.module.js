angular.module("utility.module", ['sharedModule', 'accelModule'])


.factory("utility", ['vector', function (vector) {

	var factor = {
		global:1,
		session:0.5
	};

	var yDir = 1;
	var xDir = 1;

	var con = {
		landClockwise:"landClockwise",
		valid:"valid",
		invalid:"invalid",
		portrait:"portrait",
		landscape:"landscape",
		circle:"circle",
		square:"square",
		cross:"cross",
		annihilate:"annihilate",
		remove:"remove",
		homeIndex:0,
		validIndex:8,
		settingsIndex:7,
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

	var forced = false;
	var valid = false;
	var status = con.invalid;

	var forceValidity = function (_valid) {

		forced = true;
		valid = _valid;
		status = valid ? con.valid : con.invalid;
	}

	var setValidity = function (_valid) {

		forced = false;
		valid = _valid;
		status = _valid ? con.valid : con.invalid;
	}

	var isForced = function () {

		return forced;
	}

	var isValid = function () {

		return valid;
	}

	var deviceStatus = function () {

		return status;
	}

	var setGlobalFactor = function (_$factor) {

		var _factor = Math.abs(_$factor);

		factor.global = _factor <= 1 ? _factor : _factor/100;
	}

	var setSessionFactor = function (_$factor) {

		var _factor = Math.abs(_$factor);

		factor.session = _factor <= 1 ? _factor : _factor/100;
	}

	var getGlobalFactor = function () {

		var _factor = Math.abs(factor.global);

		return _factor <= 1 ? _factor : _factor/100;
	}

	var getSessionFactor = function () {

		var _factor = Math.abs(factor.session);

		return _factor <= 1 ? _factor : _factor/100;
	}

	var getFactor = function () {

		var _factor = Math.abs(factor.global*factor.session)

		return _factor <= 1 ? _factor : _factor/100;
	}

	var setDirection = function (direction, value) {

		if (direction == "i") {
			xDir = value >= 0 ? 1 : -1;
		}
		else if (direction == "j") {
			yDir = value >= 0 ? 1 : -1;
		}

	}

	var getDirection = function (direction) {

		return direction == "i" ? (xDir >= 0 ? 1 : -1) : (yDir >= 0 ? 1 : -1);
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

	var round = function (number, order) {

		var value = Math.round(number/order)*order;

		return value;
	}

	var getRandomPosition = function (arena, distance) {
		var side = Math.random();
		var loc = Math.random();
		
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

	var getRandomVelocity = function (arena, pos, speed) {
		
		var width = $(arena).width();
		var height = $(arena).width();
		var spread = 20;
		var minimum = 20*speed;
		
		var box = {top:height*(1-0.8)/2, left:width*(1-0.8)/2, width:width*0.8, height:height*0.8};
		
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

		return Math.sqrt(vector.x*vector.x + vector.y*vector.y);
	}

	return {
		c:con,
		setGlobalFactor:setGlobalFactor,
		setSessionFactor:setSessionFactor,
    	setDirection:setDirection,
    	getGlobalFactor:getGlobalFactor,
    	getSessionFactor:getSessionFactor,
    	getFactor:getFactor,
    	getDirection:getDirection,
    	forceValidity:forceValidity,
    	setValidity:setValidity,
    	isForced:isForced,
    	deviceStatus:deviceStatus,
    	isValid:isValid,
		average:average,
		truncate:truncate,
		round:round,
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