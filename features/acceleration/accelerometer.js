accelModule.factory("accelerometer", ["vector", "global", "utility", function (vector, globals, utility) {

	var accel = function (input) {

		var self = this;

		var p = input.params;

		var obj = input.element;

		var filterBucket = [];

		var factor;
		var xDir;
		var yDir;
		var threshold;
		var interval;

		var filterSize;
		var mu;
		var damp;


		var unfiltered = new vector(0,0,0);
		var accel1 = new vector(0,0,0);
		var accel0 = new vector(0,0,0);
		var vel0 = new vector(0,0,0);
		var vel1 = new vector(0,0,0);
		var pos0 = new vector(0,0,0);
		var pos1 = new vector(0,0,0);
		var startTime = 0;

		var position = {x:pos0.x, y:pos0.y};
		var velocity = {x:vel0.x, y:vel0.y};

		var xMax = 100;
		var yMax = 100;

		var setValues = function () {

			factor = globals.factor*p.factor;
			xDir = globals.xDir;
			yDir = globals.yDir;
			threshold = factor*0.5;
			filterSize = p.filterSize;
			mu = p.mu;
			damp = p.damp;
			interval = p.interval;

		}

		var getBounds = function () {
		
			xMax = obj.getXBound();
			yMax = obj.getYBound();
			
		}

		var bounce = function () {

			getBounds();
			
			var sideX = pos1.x/Math.abs(pos1.x);
			
			var minVel = 12*(Math.abs(accel1.y)+Math.abs(accel1.x));

			//console.log(sideX + " " + xMax)
			
			if (Math.abs(pos1.x) >= xMax) {

				//console.log("bounce x");
				pos1.x	= sideX*xMax;
				vel1.x = -(1-damp)*vel1.x;
				if ((Math.abs(vel1.x) < minVel && p.gravity) || !p.bounce) {
					vel1.x = 0;	
				}
			}
			
			
			var sideY = pos1.y/Math.abs(pos1.y);
			
			//console.log(sideY + " " + yMax);

			if (Math.abs(pos1.y) >= yMax) {
				//console.log("bounce y");
				pos1.y	= sideY*yMax;
				vel1.y = -(1-damp)*vel1.y;
				if ((Math.abs(vel1.y) < minVel && p.gravity) || !p.bounce) {
					vel1.y = 0;
				}
			}
				
		}

		var friction = function () {
				
			if (accel1.len() == 0) {
				vel1 = vel1.multiply(1-mu);	
			}
		}

		var updateMotion = function (pos, vel, acc) {
				
			//con.log("update " + xPos + " " + yPos);
			
			var evt = new CustomEvent("accel", {detail:{pos:pos, vel:vel, acc:acc}, bubbles:true, cancelable:false});
			
			window.dispatchEvent(evt);
				
		}

		var integrate = function (accelArray) {
				
			accel1.set(utility.average(accelArray));

			//console.log("accel1 " + accel1.printValues());
			
			if (accel1.len() < threshold) {
				accel1.set(new vector(0,0,accel1.time));
			}
			
			var timeInterval = 1000*interval*filterSize;
			
			vel1.set(vel0.add(accel0.multiply(timeInterval)).add(accel1.subtract(accel0).multiply(0.5*timeInterval)));
			
			pos1.set(pos0.add(vel0.multiply(timeInterval)).add(vel1.subtract(vel0).multiply(0.5*timeInterval)));
			
			//console.log("pos1 before bounce" + pos1.printValues());

			bounce();
			
			friction();
			
			//logOnInterval();
			
			updateMotion(pos1, vel1, accel1);

			//console.log("pos1 after bounce" + pos1.printValues());
			
			pos0.set(pos1);
			vel0.set(vel1);
			accel0.set(accel1);

			//console.log("pos0_1 " + pos0.printValues());
			
		}

		self.setinitial = function (x, y) {

			pos0.set(new vector(x,y,pos0.time));
		}

		self.motion = function (e) {
			
			if (running) {

				if (p.gravity) {
					unfiltered.set(new vector(xDir*factor*e.accelerationIncludingGravity.x, yDir*factor*e.accelerationIncludingGravity.y, (e.timeStamp - startTime)/1000));
				}
				else {
					unfiltered.set(new vector(xDir*factor*e.acceleration.x, yDir*factor*e.acceleration.y, (e.timeStamp - startTime)/1000));
				}

				//console.log("unfiltered " + unfiltered.printValues());
			}
		}

		self.start = function () {
				
			console.log("start accel");

			setValues();
			
			running = true;
			
			startTime = (new Date()).getTime();
			
			timer = setInterval(function () {
				
				filterBucket[filterBucket.length] = unfiltered;
					
				if (filterBucket.length == filterSize) {
					
					integrate(filterBucket);
					
					filterBucket = [];	
				}
					
			}, 1000*interval);
		}
		
		self.stop = function () {
			
			con.log("stop accel");
			
			running = false;
			
			if (timer) {
				clearInterval(timer);	
			}
			
			//reset();
		}

		self.reset = function () {
			
			filterBucket = [];
			
			unfiltered = new vector(0,0,0);
			accel0 = new vector(0,0,0);
			vel0 = new vector(0,0,0);
			pos0 = new vector(0,0,0);
			startTime = 0;
			
			updateMotion(pos0, vel0, accel0);	
		}
		
		self.getMotion = function (func) {
			
			window.addEventListener("accel", function (e) {
				func(e.detail.pos, e.detail.vel, e.detail.acc);
			}, false);
				
		}

	}


	return accel;


}]);