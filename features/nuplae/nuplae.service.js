nuplaeModule.factory("nuplaeService", function ($q, params) {

	var dist = 0;

	var buttonTouch = function (el, p, complete) {

		var name = p.name;
		var back_press = p.back_press;
		var back_save = p.back_save;
		var text_press = p.text_press;
		var text_save = p.text_save;
		var add_class = p.add_class;

		console.log("bind " + name);

		var elem = $(el);

		var mc = new Hammer(elem[0]);

		var changeButton = function () {

			if (back_press && back_save) elem.removeClass(back_save).addClass(back_press);
			if (text_press && text_save) elem.removeClass(text_save).addClass(text_press);
			if (add_class) elem.addClass(add_class);

		}

		var returnButton = function () {

			if (back_press && back_save) elem.removeClass(back_press).addClass(back_save);
			if (text_press && text_save) elem.removeClass(text_press).addClass(text_save);
			if (add_class) elem.removeClass(add_class);
		}

		mc.get("press").set({time:1, threshold:1});
		//mc.get("pan").set({direction: Hammer.DIRECTION_ALL});
		
		mc.on("press", function (e) {

			dist = 0;

			changeButton();

		});

		mc.on("pressup tap", function (e) {

			dist = 0;

			returnButton();

			complete();
		});

		// mc.on("panup pandown", function (e) {

		// 	if (e.y > 10) returnButton();

		// });

		

		$(window).on("touchmove", function (e) {

			dist++;

			if (dist > 10) returnButton();
		});

	}

	var checkCoords = function (to, i) {

		return to.top == params.pages[i].page.rect.top && to.left == params.pages[i].page.rect.left;
	}

	var parseInput = function (input) {

		

		return $q(function (resolve, reject) {

			var self = this;

			this.name;
			this.page;
			this.elem;
			this.index;

			var isIndex = function (input) {

				self.index = input;
				self.page = params.pages[input];
				self.name = self.page.name;

				console.log("name is " + name);
				self.elem = $("#page" + name);

				console.log(self.elem[0]);
				
			}

			var isPage = function (input) {

				for (i in params.pages) {
					if (input.name == params.pages[i].name) {
						self.index = i;
					}
				}

				self.page = input;
				self.name = input.name;
				self.elem = $("#page" + self.name);

			}

			var isJqueryCoord = function () {

				console.log("is coord or jquery");
				console.log(input);
				if (input instanceof jQuery) {

					self.index = -1;
					self.name = null;
					self.page = null;
					self.elem = input;
				}
				else {

					for (i in params.pages) {

						if (checkCoords(input, i)) {
							sekf.index = i;
							self.page = params.pages[i];
							self.name = page.name;
							self.elem = $("#page" + self.name);
						}
					}
				}
			}


			var proceed = function (result) {

				var clear = function () {
					clearInterval(timer);
					timer = null;
				}

				var time = 0;

				var timer = setInterval(function () {

					time += 10;

					var element = $(result.elem);

					console.log(element[0]);

					if (element[0]) {
						clear();
						resolve(result);
					}
					else if (time > 2000) {
						clear();
						reject("element does not exist");
					}

				}, 10);
			}

			if (input >= 0) {
				isIndex(input);
			}
			else if (input.name && input.name.length > 0) {
				isPage(input);
			}
			else {
				isJqueryCoord(input);
			}


			proceed({
				index:self.index,
				name:self.name,
				page:self.page,
				elem:self.elem
			});
			

		});


	}

	var parseInput2 = function (input) {


		var self = this;

		this.name;
		this.page;
		this.elem;
		this.index;

		var isIndex = function (input) {

			self.index = input;
			self.page = params.pages[input];
			self.name = self.page.name;

			console.log("name is " + self.name);
			self.elem = $("#page" + self.name);

			console.log(self.elem[0]);
			
		}

		var isPage = function (input) {

			for (i in params.pages) {
				if (input.name == params.pages[i].name) {
					self.index = i;
				}
			}

			self.page = input;
			self.name = input.name;
			self.elem = $("#page" + self.name);

		}

		var isJqueryCoord = function () {

			console.log("is coord or jquery");
			console.log(input);
			if (input instanceof jQuery) {

				self.index = -1;
				self.name = null;
				self.page = null;
				self.elem = input;
			}
			else {

				for (i in params.pages) {

					if (checkCoords(input, i)) {
						sekf.index = i;
						self.page = params.pages[i];
						self.name = page.name;
						self.elem = $("#page" + self.name);
					}
				}
			}
		}

		if (input >= 0) {
			isIndex(input);
		}
		else if (input.name && input.name.length > 0) {
			isPage(input);
		}
		else {
			isJqueryCoord(input);
		}


		return {
			index:self.index,
			name:self.name,
			page:self.page,
			elem:self.elem
		};

	}

	return {
		buttonTouch:buttonTouch,
		parseInput:parseInput2
	}
});




