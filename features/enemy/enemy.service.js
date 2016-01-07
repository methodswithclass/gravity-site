enemyModule.factory("enemy.service", ['utility', 'data.service', 'vector', 'utility', function(utility, data, vector, g) {

	var special = function (input) {

		var self = this;

		var parentSize = $(input.parent).width();
		var size = parentSize*0.8;

		var container = document.createElement("div");
		$(container).addClass("absolute bordered opacity70");
		container.style.width = size + "px";
		container.style.height = size + "px";
		container.style.top = parentSize/2 - size/2 + "px";
		container.style.left = parentSize/2 - size/2 + "px";
		container.style.borderRadius = size/2 + "px";
		container.style.backgroundColor = input.destroy.color;
		$(input.parent).append(container);

		self.explode = function (complete) {

			$(container).animate({
				width:2000,
				height:2000,
				borderRadius:1000,
				left:-1000,
				top:-1000
			}, input.destroy.speed*800, complete);
		}

	}

	var particle = function (input) {

		var self = this;

		var parentSize = $(input.parent).width();
		var maxSize = parentSize*0.8;

		var size = Math.random()*maxSize*0.5 + maxSize*0.5;
		var duration = Math.random()*400 + 600;
		var radius = 900;
		var end = {x:Math.random()*2 - 1, y:Math.random()*2 - 1};
		var reduce = 0.2;
		var color = input.color;

		var container = document.createElement("div");
		container.style.position = "absolute";
		container.style.width = size + "px";
		container.style.height = size + "px";
		container.style.top = parentSize/2 - size/2 + "px";
		container.style.left = parentSize/2 - size/2 + "px";
		container.style.borderRadius = size/2 + "px";
		container.style.backgroundColor = 'rgb(' + [color.red,color.green,color.blue].join(',') + ')';
		$(input.parent).append(container);

		self.explode = function (params, _complete) {

			var complete = function () {};

			if (params.duration) duration = Math.random()*params.duration*0.7 + params.duration;
			if (params.radius) radius = params.radius;
			if (params.reduce) reduce = params.reduce;
			if (_complete) complete = _complete;

			$(container).animate({
				left:radius*end.x,
				top:radius*end.y,
				width:size*reduce,
				height:size*reduce
			}, duration, complete);
		}

	}

	var getType = function () {

		var types = data.enemydata;
		var rand = Math.random();

		for (i in types) {
			if (rand < types[i].normal) {
				return i;
			}
		}

		return 0;
	}

	var enemy = function (input) {

		var self = this;

		self.id = input.id;
		self.type = data.enemydata[getType()];
		self.shape = self.type.shape;
		self.radius = self.type.size;
		self.bounds = {x:$(input.arena).width(), y:$(input.arena).height()};
		var distance = 350;
		self.position = utility.getRandomPosition(input.arena, distance);
		self.velocity = utility.getRandomVelocity(input.arena, self.position, self.type.speed);

		self.moving = true;

		var numParts = 4;
		var particles = [];
		var specials;
		var color = {red:Math.floor(Math.random()*255), green:Math.floor(Math.random()*255), blue:Math.floor(Math.random()*255)};
		
		var container = document.createElement("div");
		container.style.position = "absolute";
		container.style.width = 2*self.radius + "px";
		container.style.height = 2*self.radius + "px";

		$(input.arena).append(container);

		var inner = document.createElement("div");
		inner.classList.add("enemyInner");
		inner.style.backgroundColor = this.type.color;
		if (this.shape == g.c.circle)
			inner.style.borderRadius = this.radius + "px";

		
		if (self.type.destroy == "standard") {
			
			for (var i = 0; i < numParts; i++) {

				//end = {x:Math.sin(Math.PI*2*i/numParts + shift), y:Math.cos(Math.PI*2*i/numParts + shift)};

				particles[i] = new particle({parent:container, color:color});
			}
		}
		else {

			specials = new special({parent:container, destroy:self.type.destroy});

		}

		$(container).append(inner);

		self.el = function () {

			return container;
		}

		this.remove = function () {
			$(self.el()).remove();	
		}

		self.setPosition = function () {
			container.style.top = self.position.y + "px";
			container.style.left = self.position.x + "px";	
		}

		self.update = function () {

			if (self.moving) {
				self.position = self.position.add(self.velocity);
				
				self.setPosition();
			}
		}

		self.intersect = function (object) {

			return utility.intersectShape(self, object);

		}

		self.lost = function () {

			if (self.position.x < -distance || self.position.x > self.bounds.x + distance) {
				console.log("lost");
				return true;
			}
			
			//is lost outside Y boundaries
			if (self.position.y < -distance || self.position.y > self.bounds.y + distance) {
				console.log("lost");
				return true;
			}

			return false;

		}

		self.visible = function () {

			if (self.position.x < self.bounds.x && self.position.y < self.bounds.y) {
				return true;
			}

			return false;
		}

		self.destroy = function (params) {

			self.moving = false;

			$(inner).remove();

			if (self.type.destroy == "standard") {

				for (i in particles) {
					
					if (i == numParts - 1) {
						particles[i].explode(params, function () { 
							if (params.complete) {
								params.complete(params.index);
							}
					 	});
					}
					else {
						particles[i].explode(params);
					}
				}

			}
			else {

				specials.explode(function () { 
					if (params.complete) {
						params.complete(params.index);
					}
			 	});

			}


		}

		this.setPosition();
			
	}

	return enemy;

}]);