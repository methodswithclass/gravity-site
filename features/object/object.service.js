objectModule.factory("object.service", ["utility", function (utility) {

	var self = this;

	var object = function (input) {

		var self = this;

		var p = input.parent;
		var container = input.element;

		var xMax = 100;
		var yMax = 100;

		var relPos = {x:0, y:0};
		
		self.position = {x:0, y:0};
		self.velocity = {x:0, y:0};
		self.acceleration = {x:0, y:0};

		self.el = function () {

			return container;
		}

		self.getXBound = function () {
			xMax = $(p).width()/2 - $(self.el()).width()/2;

			//console.log("get x bound " + xMax);
		
			return xMax;
		}
		
		self.getYBound = function () {
			yMax = $(p).height()/2 - $(self.el()).height()/2;

			//console.log("get y  bound " + yMax);
		
			return yMax;
		}

		self.setPosition = function (pos) {

			relPos = pos;
			
			self.position = {x:xMax + relPos.x, y:yMax + relPos.y};
			//self.center = {x:self.position.x + radius, y:self.position.y + radius};
			
			//console.log("position: " + position.x + " " + position.y);
			
			container.style.left = utility.truncate(self.position.x,0) + "px";
			container.style.top = utility.truncate(self.position.y,0) + "px";
			
		}

		self.setVelocity = function (vel) {
			//con.log("velX: " + vel.x + " velY: " + vel.y);
			self.velocity = vel;
		}

		self.setAcceleration = function (acc) {

			self.acceleration = acc;
		}

		self.absolutePos = function () {

			return relPos;
		}

		self.hide = function () {

			self.setPosition(relPos);

			$(self.el()).hide();
		}

		self.show = function() {

			self.setPosition(relPos);

			$(self.el()).show();
		}

	}

	

	var create2 = function (_parent) {

		container = _parent;

	}

	var createCircle = function (obj) {

		radius = obj.size;

		container.style.width = 2*obj.size + "px";
		container.style.height = 2*obj.size + "px";
		container.style.borderRadius = obj.size + "px";
		container.style.backgroundColor = obj.color;

	}

	var createSquare = function (obj) {

		radius = obj.size/2;

		container.style.width = obj.size + "px";
		container.style.height = obj.size + "px";
		container.style.backgroundColor = obj.color;

	}

	var createCross = function (obj) {

		radius = obj/2;

		container.style.width = obj.size + "px";
		container.style.height = obj.size + "px";
		//container.style.border = "1px solid black";

		var vertical = document.createElement("div");
		var horizontal = document.createElement("div");

		vertical.style.position = "absolute";
		vertical.style.top = 0;
		vertical.style.left = "50%";
		vertical.style.width = "2px";
		vertical.style.height = "100%";
		vertical.style.backgroundColor = obj.color;

		horizontal.style.position = "absolute";
		horizontal.style.top = "50%";
		horizontal.style.left = 0;
		horizontal.style.width = "100%";
		horizontal.style.height = "2px";
		horizontal.style.backgroundColor = obj.color;

		$(container).append(vertical);
		$(container).append(horizontal);
	}
	
	
	var setShape = function (obj) {

		console.log("set shape");

		switch (obj.shape) {

			case params.circle:
				createCircle(obj);
			break;

			case params.square:
				createSquare(obj);
			break;

			case params.cross:
				createCross(obj);
			break;
		}

	}

	return object;

}]);