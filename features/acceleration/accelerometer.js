accelModule.factory("accel", function(Vector) {


	var Accelerometer = function (params, obj) {

		var self = this;
		
		var interval = params.interval;

		var printCount = 0;

		this.xMax = 100;
		this.yMax = 100;
		
		this.getBounds = function () {
		
			self.xMax = obj.getXBound();
			self.yMax = obj.getYBound();
			
		}
		
		window.addEventListener("orient", this.getBounds);
		
		this.getBounds();
			
		var filterBucket = [];
		var filterSize = params.filterSize;

		var factor;
		var xDir;
		var yDir;
		var threshold;


		this.raw = {x:0, y:0, z:0};
		this.down = 0;
		var unfiltered = new Vector(0,0,0);
		var accel1 = new Vector(0,0,0);
		var accel0 = new Vector(0,0,0);
		var vel0 = new Vector(0,0,0);
		var vel1 = new Vector(0,0,0);
		var pos0 = new Vector(0,0,0);
		var pos1 = new Vector(0,0,0);
		var startTime = 0;
		
		var position = {x:pos0.x, y:pos0.y};
		var velocity = {x:vel0.x, y:vel0.y};
		
		var mu = params.mu;
		var damp = params.damp;

		var running = false;
		var timer;

		var logOnInterval = function () {
			
			if (accel1.len() > 0) {
				console.log("accel: " + accel1.printValues() + " len: " + accel1.len());
				//self.log("vel: " + self.vel1.printValues());
				console.log("pos: " + pos1.printValues());
				
				console.log(" ");
			}
		}

		var setValues = function () {

			factor = globals.factor*params.factor;
			xDir = globals.xDir;
			yDir = globals.yDir;
			threshold = factor*0.5;

		}
		
		var bounce = function () {

			self.getBounds();
			
			var sideX = pos1.x/Math.abs(pos1.x);
			
			var minVel = 12*(Math.abs(accel1.y)+Math.abs(accel1.x));

			//console.log(sideX + " " + self.xMax)
			
			if (Math.abs(pos1.x) >= self.xMax) {

				//console.log("bounce x");
				pos1.x	= sideX*self.xMax;
				vel1.x = -(1-damp)*vel1.x;
				if ((Math.abs(vel1.x) < minVel && params.gravity) || !params.bounce) {
					vel1.x = 0;	
				}
			}
			
			
			var sideY = pos1.y/Math.abs(pos1.y);
			
			//console.log(sideY + " " + self.yMax);

			if (Math.abs(pos1.y) >= self.yMax) {
				//console.log("bounce y");
				pos1.y	= sideY*self.yMax;
				vel1.y = -(1-damp)*vel1.y;
				if ((Math.abs(vel1.y) < minVel && params.gravity) || !params.bounce) {
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
				accel1.set(new Vector(0,0,accel1.time));
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

		this.setinitial = function (x, y) {

			pos0.set(new Vector(x,y,pos0.time));
		}

		this.motion = function (e) {
			
			if (running) {

				if (params.gravity) {
					unfiltered.set(new Vector(xDir*factor*e.accelerationIncludingGravity.x, yDir*factor*e.accelerationIncludingGravity.y, (e.timeStamp - startTime)/1000));
				}
				else {
					unfiltered.set(new Vector(xDir*factor*e.acceleration.x, yDir*factor*e.acceleration.y, (e.timeStamp - startTime)/1000));
				}

				//console.log("unfiltered " + unfiltered.printValues());
			}
		}


		this.getRaw = function (e) {

			self.raw = e.accelerationIncludingGravity;

			self.down = utility.len(self.raw);

			//console.log(self.down);
		}
		
		this.start = function () {
			
			console.log("running");

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
		
		this.stop = function () {
			
			con.log("stopped");
			
			running = false;
			
			if (timer) {
				clearInterval(timer);	
			}
			
			//self.reset();
		}

		this.reset = function () {
			
			filterBucket = [];
			
			unfiltered = new Vector(0,0,0);
			accel0 = new Vector(0,0,0);
			vel0 = new Vector(0,0,0);
			pos0 = new Vector(0,0,0);
			startTime = 0;
			
			updateMotion(pos0, vel0, accel0);	
		}
		
		this.getMotion = function (func) {
			
			window.addEventListener("accel", function (e) {
				func(e.detail.pos, e.detail.vel, e.detail.acc);
			}, false);
				
		}

		this.getAccel = function () {

			return accel1;
		}
			
	}

	return Accelerometer;
		

});