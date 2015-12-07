objectModule.factory("object.service", ["utility", function (utility) {

	var self = this;

	var object = function (input) {

		var self = this;
		var container = input.object;
		var arena = input.arena;
		var relPos = {x:0, y:0};
		
		self.position = {x:0, y:0};
		self.velocity = {x:0, y:0};
		self.acceleration = {x:0, y:0};

		self.arena = {x:$(arena).width(), y:$(arena).height()};
		self.size = {x:$(container).width(), y:$(container).height()};
		self.bounds = {x:self.arena.x/2 - self.size.x/2, y:self.arena.y/2 - self.size.y/2};
		self.radius = self.size.x/2;

		//console.log(params.name);

		self.shape = input.params.obj.shape;

		self.el = function () {

			return container;
		}

		// self.getXBound = function () {
		// 	self.xMax = $(p).width()/2 - $(self.el()).width()/2;

		// 	//console.log("get x bound " + xMax);
		
		// 	return self.xMax;
		// }
		
		// self.getYBound = function () {
		// 	self.yMax = $(p).height()/2 - $(self.el()).height()/2;

		// 	//console.log(p);
		// 	//console.log("get y  bound " + self.yMax);
		
		// 	return self.yMax;
		// }

		self.setPosition = function (pos) {

			relPos = pos;
			
			self.position = {x:self.bounds.x + relPos.x, y:self.bounds.y + relPos.y};
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

			//console.log(relPos);

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