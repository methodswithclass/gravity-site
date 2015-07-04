accelModule.factory("Vector", function () {


	var Vector = function (x,y,time) {

		var self = this;

		this.x = x;
		this.y = y;
		this.time = time;

		var truncate = function (number, decimal) {

			var value = Math.floor(number*Math.pow(10, decimal))/Math.pow(10, decimal);
			
			return value;
		}
		
		this.len = function () {
			return Math.sqrt(self.x*self.x + self.y*self.y);
		}
		
		this.add = function (vector) {
			return new Vector(self.x+vector.x, self.y+vector.y, self.time);
		}
		
		this.subtract = function(vector) {
			//console.log("self " + self.printValues() + "\n vector " + vector.printValues());
			return new Vector(self.x-vector.x, self.y-vector.y, self.time);	
		}
		
		this.multiply = function (scalar) {
			return new Vector(self.x*scalar, self.y*scalar, self.time);	
		}
		
		this.unit = function () {
			
			if (self.len() > 0) {
				return self.multiply(1/self.len());
			}
			else {
				return new Vector(0,0,0);	
			}
			
			
		}

		this.set = function (vector) {

			self.x = vector.x;
			self.y = vector.y;
			self.time = vector.time;

			//console.log(which + " self " + self.printValues() + "\n vector " + vector.printValues());
		}
		
		this.printValues = function () {
			return "x: " + self.x + " y: " + self.y + " t: " + self.time;
		}

	}

	return Vector;

	

});