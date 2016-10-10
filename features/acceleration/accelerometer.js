accelModule.factory("accelerometer", ["vector", "utility", function (vector, g) {

	var accel = function (input) {

		var self = this;

		var p = input.params;
		self.obj = input.object;
		self.name = input.id;

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
		var raw = {x:0, y:0};
		var startTime = 0;

		var timer;
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
			
			var sideX = pos1.x/Math.abs(pos1.x);
			
			var minVel = 12*(Math.abs(accel1.y)+Math.abs(accel1.x));
			
			if (Math.abs(pos1.x) >= self.bounds.x) {

				pos1.x	= sideX*self.bounds.x;
				vel1.x = -(1-damp)*vel1.x;
				if ((Math.abs(vel1.x) < minVel && p.gravity) || !p.bounce) {
					vel1.x = 0;	
				}
			}
			
			
			var sideY = pos1.y/Math.abs(pos1.y);

			if (Math.abs(pos1.y) >= self.bounds.y) {
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

			self.obj.setPosition(pos);
			self.obj.setVelocity(vel);
			self.obj.setAcceleration(acc);

			//var event = new CustomEvent('accel', { 'detail':{pos:pos, vel:vel, accel:acc}});
				
		}

		var integrate = function (accelArray) {
				
			accel1.set(g.average(accelArray));
			
			if (accel1.len() < threshold) {
				accel1.set(new vector(0,0,accel1.time));
			}
			
			var timeInterval = interval*filterSize;

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

			self.bounds.x = $(input.arena).width()/2 - self.obj.size.x/2;
			self.bounds.y = $(input.arena).height()/2 - self.obj.size.y/2;

		}

		self.motion = function (e) {
			
			if (running) {

				if (p.gravity) {
					unfiltered.set(new vector(xDir*factor*e.accelerationIncludingGravity.x, yDir*factor*e.accelerationIncludingGravity.y, (e.timeStamp - startTime)/1000));
				}
				else {
					unfiltered.set(new vector(xDir*factor*e.acceleration.x, yDir*factor*e.acceleration.y, (e.timeStamp - startTime)/1000));
				}

				//console.log("unfiltered", "x", unfiltered.x, "y", unfiltered.y);
			}
		}

		self.raw = function (e) {

			raw = {
				x:e.accelerationIncludingGravity.x,
				y:e.accelerationIncludingGravity.y
			}
		}

		self.start = function () {
				
			console.log("start accel", self.name);

			setValues();
			
			running = true;
			
			startTime = (new Date()).getTime();
			
			timer = setInterval(function () {
				
				filterBucket[filterBucket.length] = unfiltered;
					
				if (filterBucket.length == filterSize) {
					
					integrate(filterBucket);
					
					filterBucket = [];	
				}
				
			}, interval);
		}
		
		self.stop = function () {
			
			console.log("stop accel", self.name);
			
			running = false;
			
			if (timer) {
				clearInterval(timer);
			}

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

		self.getRaw = function () {

			return raw;
		}

	}


	return accel;


}]);