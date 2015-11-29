accelModule.factory("accelerometer", ["vector", "global", "utility", function (vector, globals, utility) {

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

		this.xMax = 100;
		this.yMax = 100;

		var running = false;

		var setValues = function () {

			factor = globals.getFactor()*p.factor;
			xDir = globals.getDirection("i");
			yDir = globals.getDirection("j");
			threshold = factor*0.5;
			filterSize = p.filterSize;
			mu = p.mu;
			damp = p.damp;
			interval = p.interval;

		}

		self.getBounds = function () {
		
			self.xMax = obj.getXBound();
			self.yMax = obj.getYBound();
			
		}

		self.getBounds();

		var bounce = function () {

			console.log("bounce");

			self.getBounds();
			
			var sideX = pos1.x/Math.abs(pos1.x);
			
			var minVel = 12*(Math.abs(accel1.y)+Math.abs(accel1.x));

			//console.log(sideX + " " + xMax)
			
			if (Math.abs(pos1.x) >= self.xMax) {

				//console.log("bounce x");
				pos1.x	= sideX*self.xMax;
				vel1.x = -(1-damp)*vel1.x;
				if ((Math.abs(vel1.x) < minVel && p.gravity) || !p.bounce) {
					vel1.x = 0;	
				}
			}
			
			
			var sideY = pos1.y/Math.abs(pos1.y);
			
			//console.log(sideY + " " + yMax);

			if (Math.abs(pos1.y) >= self.yMax) {
				//console.log("bounce y");
				pos1.y	= sideY*self.yMax;
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
				
			accel1.set(utility.average(accelArray));

			//console.log(accel1);

			//console.log("accel1 " + accel1.printValues());
			
			if (accel1.len() < threshold) {
				accel1.set(new vector(0,0,accel1.time));
			}
			
			var timeInterval = 1000*interval*filterSize;
			
			//console.log(accel1);

			vel1.set(vel0.add(accel0.multiply(timeInterval)).add(accel1.subtract(accel0).multiply(0.5*timeInterval)));
			
			//console.log(vel1);

			pos1.set(pos0.add(vel0.multiply(timeInterval)).add(vel1.subtract(vel0).multiply(0.5*timeInterval)));
			
			//console.log(pos1);

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

				//console.log(e.accelerationIncludingGravity.x + " " + e.accelerationIncludingGravity.y)
				//console.log("unfiltered " + unfiltered.printValues());
			}
		}

		self.start = function () {
				
			console.log("start accel");

			setValues();
			
			running = true;
			
			startTime = (new Date()).getTime();
			
			timer = setInterval(function () {

				//console.log("integrate");
				
				filterBucket[filterBucket.length] = unfiltered;
					
				if (filterBucket.length == filterSize) {
					
					integrate(filterBucket);
					
					filterBucket = [];	
				}
					
			}, 1000*interval);
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

			self.down = utility.len(raw);

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