enemyModule.factory("enemy.service", ['utility', 'data.service', 'vector', 'global', function(utility, data, vector, g) {

	var particle = function (input) {

		var self = this;

		var parentSize = $(input.parent).width();
		var maxSize = parentSize*0.8;
		var pieceColor = input.params.pieceColor;

		var size = Math.random()*maxSize*0.3 + maxSize*0.7;
		//var speed = Math.random()*10 + 10;
		//var direction = {x:Math.random()*10 - 5, y:Math.random()*10 - 5};
		//self.velocity = {x:speed*direction.x, y:speed*direction.y};
		//self.position = {x:0, y:0};
		var duration = Math.random()*100 + 800;
		var maxRadius = 700;
		var end = {x:Math.random()*maxRadius*2 - maxRadius, y:Math.random()*maxRadius*2 - maxRadius};
		var color = {red:Math.floor(Math.random()*pieceColor.red), green:Math.floor(Math.random()*pieceColor.green), blue:Math.floor(Math.random()*pieceColor.blue)};
		var scale = 100;

		//self.maxRadius = 500;

		self.active = true;

		var container = document.createElement("div");
		container.style.position = "absolute";
		container.style.width = size + "px";
		container.style.height = size + "px";
		container.style.top = parentSize/2 - size/2 + "px";
		container.style.left = parentSize/2 - size/2 + "px";
		container.style.borderRadius = size/2 + "px";
		container.style.backgroundColor = 'rgb(' + [color.red,color.green,color.blue].join(',') + ')';
		$(input.parent).append(container);
		//$(container).hide();

		var setPosition = function () {

			container.style.top = $(input.parent).height()/2 - size/2 + self.position.y + "px";
			container.style.left = $(input.parent).width()/2 - size/2 + self.position.x + "px";

		}

		// self.update = function () {

		// 	//visible();

		// 	self.position.x += self.velocity.x;
		// 	self.position.y += self.velocity.y;

		// 	setPosition();

		// 	scale = 1-Math.sin(Math.PI/2 * Math.abs(self.position.x)/self.maxRadius);

		// 	//console.log(scale);

		// 	$(container).css({
		// 	  '-webkit-transform' : 'scale(' + scale + ')',
		// 	  '-moz-transform'    : 'scale(' + scale + ')',
		// 	  '-ms-transform'     : 'scale(' + scale + ')',
		// 	  '-o-transform'      : 'scale(' + scale + ')',
		// 	  'transform'         : 'scale(' + scale + ')'
		// 	});

		// 	if (scale <= 0.2) {
		// 		self.active = false;
		// 	}

		// }

		self.update = function (_duration) {

			$(container).animate({
				left:end.x,
				top:end.y,
				width:size*0.2,
				height:size*0.2
			}, _duration ? _duration : duration, function () {

				self.active = false;
			});
		}

		self.remove = function (){

			$(container).remove();
		}

		//setPosition();

	}

	var enemy = function (input) {

		var self = this;

		self.id = input.id;
		self.type = data.enemydata[input.type];
		self.shape = self.type.shape;
		self.radius = self.type.size;
		self.bounds = {x:$(input.arena).width(), y:$(input.arena).height()};
		self.position = utility.getRandomPosition(input.arena);
		self.velocity = utility.getRandomVelocity(input.arena, self.position);

		self.moving = true;
		self.active = true;

		var numParts = 5;
		var part;
		var particles = [];
		
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

		for (var i = 0; i < numParts; i++) {

			particles[i] = new particle({parent:container, params:self.type});
		}

		$(container).append(inner);

		self.el = function () {

			return container;
		}

		this.remove = function () {
			$(self.el()).remove();	
		}

		self.setPosition = function () {
			container.style.top = utility.truncate(self.position.y,0) + "px";
			container.style.left = utility.truncate(self.position.x,0) + "px";	
		}

		self.update = function () {

			if (self.moving) {
				self.position = self.position.add(self.velocity);
				
				self.setPosition();
			}
			else {

				// var i = 0;

				// while (i < particles.length) {
				// 	particles[i].update();
				// }

				self.active = particles.every(function (current, index, array) {

					return current.active;

				});

			}
		}

		self.intersect = function (object) {

			return utility.intersectShape(self, object);

		}

		self.lost = function () {

			if (self.position.x < -200 || self.position.x > self.bounds.x + 200) {
				return true;
			}
			
			//is lost outside Y boundaries
			if (self.position.y < -200 || self.position.y > self.bounds.y + 200) {
				return true;
			}

			return false;

		}

		self.destroy = function (duration) {

			$(inner).remove();
			self.moving = false;

			for (i in particles) {
				particles[i].update(duration);
			}
		}

		this.setPosition();

	}

	return enemy;

}]);