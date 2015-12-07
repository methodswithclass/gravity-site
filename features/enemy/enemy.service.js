enemyModule.factory("enemy.service", ['utility', 'data.service', 'vector', 'global', function(utility, data, vector, g) {

	var enemy = function (input) {

		var self = this;

		self.id = input.id;
		self.moving = true;
		self.type = data.enemydata[input.type];
		self.destroySpeed = 300;
		self.moving = true;
		self.shape = self.type.shape;
		self.radius = self.type.size;

		self.doesDestroy = input.destroy;


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

		$(container).append(inner);

		self.position = utility.getRandomPosition(input.arena);
		self.velocity = utility.getRandomVelocity(input.arena, self.position);

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

		self.destroy = function (keeper, reward, complete) {

			//console.log(keeper.addPoints);

			if (reward) {
				keeper.addPoints(self.type.reward);
			}
			else if (!reward) {
				keeper.addPoints(self.type.punish);
			}

			self.remove();

			if (complete) complete(self.id, true);
			
		}

		self.update = function (object, create, keeper) {
			
			//con.log("update");
			if (self.moving) {
				self.position = self.position.add(self.velocity);
				
				//is lost outside X boundaries
				if (self.position.x < -200 || self.position.x > self.pageWidth + 200) {
					self.destroy(keeper, false, create);	
				}
				
				//is lost outside Y boundaries
				if (self.position.y < -200 || self.position.y > self.pageHeight + 200) {
					self.destroy(keeper, false, create);
				}
				
				self.setPosition();

				//is destroyed by object
				if (utility.intersectShape(self, object)) {
					
					if (self.doesDestroy) {
						self.moving = false;
						//con.log("destroy");
						self.destroy(keeper, true, create);
					}
				}
			}
			
			
		}

		this.setPosition();

	}

	return enemy;

}]);