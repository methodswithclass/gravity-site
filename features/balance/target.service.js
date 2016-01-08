balanceModule.factory("target.service", ['utility', function (utility) {

	var target = function (input) {

		var self = this;

		var color = {red:Math.floor(Math.random()*255), green:Math.floor(Math.random()*255), blue:Math.floor(Math.random()*255)};

		self.size = {width:input.size, height:input.size};
		self.radius = self.size.width/2;
		self.active = true;
		self.cycleNum = 0;

		var container = document.createElement("div");
		container.style.position = "absolute";
		container.style.width = self.size.width + "px";
		container.style.height = self.size.height + "px";
		container.style.borderRadius = self.radius + "px";
		container.style.backgroundColor = 'rgb(' + [color.red,color.green,color.blue].join(',') + ')';
		container.style.opacity = 0.7;
		container.style.border = "3px solid black";
		
		$(input.parent).append(container);

		var getRandomPosition = function (position) {

			var x;
			var arena = {width:$(input.parent).width(), height:$(input.parent).height()}
			var spread = {x:arena.width - self.size.width - 20, y:arena.height/2 - self.size.height - 20};
			var min = {x:20};

			if (position.y < arena.height/2) {
				min.y = arena.height/2;
			}
			else {
				min.y  = 20;
			}

			return {x:Math.random()*spread.x + min.x, y:Math.random()*spread.y + min.y};

		}

		self.hide = function () {

			self.active = false;
			$(container).hide();
		}

		self.show = function () {

			self.active = true;
			$(container).show();
		}

		var setColor = function () {

			color = {red:Math.floor(Math.random()*255), green:Math.floor(Math.random()*255), blue:Math.floor(Math.random()*255)};

			container.style.backgroundColor = 'rgb(' + [color.red,color.green,color.blue].join(',') + ')';
		}

		var setSize = function () {

			container.style.width = self.size.width + "px";
			container.style.height = self.size.height + "px";
			container.style.borderRadius = self.radius + "px";
			container.style.opacity = 0.7;
		}

		var setPosition = function () {

			container.style.top = self.position.y + "px";
			container.style.left = self.position.x + "px";
		}

		self.reset = function () {

			self.position = getRandomPosition(self.position);
			setPosition();
			setSize();
			setColor();
		}

		var cycle = function () {

			self.hide();
			self.reset();

			setTimeout(function () {

				self.show();

			}, 700);
		}

		self.overlap = function (object) {

			//console.log(self.active);

			return utility.overlapShape(self, object, 0.2*self.radius);
		}

		self.finish = function (result, complete) {

			

			if (result == 1) {

				self.active = false;

				container.style.opacity = 0.9;
				container.style.backgroundColor = "green";

				$(container).animate({
					width:self.size.width*1.4,
					height:self.size.height*1.4,
					borderRadius:self.radius*1.4,
					left:self.position.x - self.size.width*0.2,
					top:self.position.y - self.size.height*0.2
				}, 100)
				.delay(100)
				.animate({
					width:0, 
					height:0, 
					borderRadius:0,
					left:self.position.x + self.radius,
					top:self.position.y + self.radius
				}, 100, function () {

					complete();
					cycle();
				});

				
			}
			else if (result == -1) {

				self.active = false;

				container.style.opacity = 0.9;
				container.style.backgroundColor = "red";

				$(container).animate({
					width:2000, 
					height:2000, 
					borderRadius:1000,
					left:self.position.x-1000,
					top:self.position.y-1000
				}, 100, function () {

					complete();
					cycle();
				});
			}

		}

		self.position = getRandomPosition({x:0, y:0});
		setPosition();
		self.hide();

	}

	return target;

}]);