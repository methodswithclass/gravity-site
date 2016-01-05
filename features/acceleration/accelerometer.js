accelModule.factory("accelerometer", ["vector", "utility", function (vector, g) {

	var accel = function (input) {

		var self = this;

		var p = input.params;
		var obj = input.object;

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

		var raw = {x:0, y:0, z:0};
		self.down = 0;
		var running = false;

		self.bounds = {x:100, y:100};

		var setValues = function () {

			factor = g.getFactor()*p.factor;
			xDir = g.getDirection("i");
			yDir = g.getDirection("j");
			threshold = factor*0.5;
			filterSize = p.filterSize;
			mu = p.mu;
			damp = p.damp;
			interval = p.interval;

		}

		var bounce = function () {

			//console.log("bounce");
			
			var sideX = pos1.x/Math.abs(pos1.x);
			
			var minVel = 12*(Math.abs(accel1.y)+Math.abs(accel1.x));

			//console.log(sideX + " " + self.bounds.x)
			
			if (Math.abs(pos1.x) >= self.bounds.x) {

				//console.log("bounce x");
				pos1.x	= sideX*self.bounds.x;
				vel1.x = -(1-damp)*vel1.x;
				if ((Math.abs(vel1.x) < minVel && p.gravity) || !p.bounce) {
					vel1.x = 0;	
				}
			}
			
			
			var sideY = pos1.y/Math.abs(pos1.y);
			
			//console.log(sideY + " " + self.bounds.y);

			if (Math.abs(pos1.y) >= self.bounds.y) {
				//console.log("bounce y");
				pos1.y	= sideY*self.bounds.y;
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
				
			//console.log(pos);
			
			// var evt = new CustomEvent("accel", {detail:{pos:pos, vel:vel, acc:acc}, bubbles:true, cancelable:false});
			// window.dispatchEvent(evt);

			obj.setPosition(pos);
			obj.setVelocity(vel);
			obj.setAcceleration(acc);
				
		}

		var integrate = function (accelArray) {
				
			accel1.set(g.average(accelArray));
			
			if (accel1.len() < threshold) {
				accel1.set(new vector(0,0,accel1.time));
			}
			
			var timeInterval = 1000*interval*filterSize;

			vel1.set(vel0.add(accel0.multiply(timeInterval)).add(accel1.subtract(accel0).multiply(0.5*timeInterval)));
			pos1.set(pos0.add(vel0.multiply(timeInterval)).add(vel1.subtract(vel0).multiply(0.5*timeInterval)));

			bounce();
			friction();
			
			updateMotion(pos1, vel1, accel1);
			
			pos0.set(pos1);
			vel0.set(vel1);
			accel0.set(accel1);
		}

		self.setinitial = function (x, y) {

			pos0.set(new vector(x,y,pos0.time));
		}

		self.initialize = function (input) {

			self.setinitial(0,0);

			self.bounds["x"] = $(input.arena).width()/2 - obj.size.x/2;
			self.bounds["y"] = $(input.arena).height()/2 - obj.size.y/2;

		}

		self.motion = function (e) {
			
			if (running) {

				console.log(input.id + " motion");

				//console.log("motion " + e.accelerationIncludingGravity.y);

				if (p.gravity) {
					unfiltered.set(new vector(xDir*factor*e.accelerationIncludingGravity.x, yDir*factor*e.accelerationIncludingGravity.y, (e.timeStamp - startTime)/1000));
				}
				else {
					unfiltered.set(new vector(xDir*factor*e.acceleration.x, yDir*factor*e.acceleration.y, (e.timeStamp - startTime)/1000));
				}
			}
		}

		self.start = function () {
				
			console.log("start accel");

			setValues();
			
			running = true;
			
			startTime = (new Date()).getTime();
			
			timer = setInterval(function () {

				//console.log("local");

				//console.log("integrate");
				
				filterBucket[filterBucket.length] = unfiltered;
					
				if (filterBucket.length == filterSize) {
					
					integrate(filterBucket);
					
					filterBucket = [];	
				}
				
			}, interval);
		}
		
		self.stop = function () {
			
			console.log("stop accel");
			
			running = false;
			
			if (timer) {
				clearInterval(timer);
			}
			
			//reset();
		}

		self.getRaw = function (e) {

			raw = e.accelerationIncludingGravity;

			self.down = g.len(raw);

			//console.log(self.down);
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