nuplaeModule.factory("nuplaeService", ['$q', 'params', 'send', 'global', '$rootScope', 'states', function ($q, params, send, g, $rootScope, states) {

	var dist = 0;
	var down = false;

	var home = {};
	var options = {};
	var objs = {};


	var setupReceivers = function () { 

		console.log("setup receivers");
		
		send.receiver({name:g.c.home, receiver:home});
		send.receiver({name:g.c.option, receiver:options});
		send.receiver({name:"optionObj", receiver:objs});
	}

	var changeButton = function (elem, p) {

		//top = elem.offset().top;

		console.log("change button");

		if (p.back_press && p.back_save) elem.removeClass(p.back_save).addClass(p.back_press);
		if (p.text_press && p.text_save) elem.removeClass(p.text_save).addClass(p.text_press);
		if (p.add_class) elem.addClass(p.add_class);

	}

	var returnButton = function (elem, p) {

		console.log("return button");

		console.log(elem[0]);

		console.log(p);

		if (p.back_press && p.back_save) elem.removeClass(p.back_press).addClass(p.back_save);
		if (p.text_press && p.text_save) elem.removeClass(p.text_press).addClass(p.text_save);
		if (p.add_class) elem.removeClass(p.add_class);
	}

	var bindScroll = function (name) {

		var self = this;

		console.log(name);

		this.option = $(options[name]);
		this.obj = objs[name];

		console.log(this.option[0]);
		console.log(this.obj);

		this.start = 0;
		this.e;
		this.down = false;

		var onDown = function (ev) {

			self.e = ev.originalEvent;
			console.log("down");
			self.start = self.e.pageY;
			self.down = true;

		}

		var onMove = function (ev) {

			self.e = ev.originalEvent;

			console.log("move" + self.start + " " + self.e.pageY);
			if (self.down && Math.abs(self.e.pageY - self.start) > 10) {
				console.log("return");
				returnButton(self.option, self.obj);
				self.down = false;
			}

		}

		$(window).on("touchstart", onDown);

		$(window).on("touchmove", onMove);

		$(window).on("mousedown", onDown);

		$(window).on("mousemove", onMove);

	}

	var onScroll = function () {

		var pages = params.pages;

		for (i in pages) {

			bindScroll("option" + pages[i].name);

		}


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

		console.log("parse input 2");

		var name;
		var page;
		var elem;
		var index;

		if (input >= 0) {
			index = input;
			page = params.pages[input];
			name = page.name;

			console.log("name is " + name);
			elem = $("#page" + name);

			//console.log(elem[0]);
		}
		else if (input.name && input.name.length > 0) {
			for (i in params.pages) {
				if (input.name == params.pages[i].name) {
					index = i;
				}
			}

			page = input;
			name = input.name;
			elem = $("#page" + name);
		}
		else {
			console.log("is coord or jquery");
			console.log(input);
			if (input instanceof jQuery) {

				index = -1;
				name = null;
				page = null;
				elem = input;
			}
			else {

				for (i in params.pages) {

					if (checkCoords(input, i)) {
						index = i;
						page = params.pages[i];
						name = page.name;
						elem = $("#page" + name);
					}
				}
			}
		}


		return {
			index:index,
			name:name,
			page:page,
			elem:elem
		};

	}

	var parseInput3 = function (input) {

		var name;
		var page;
		var elem;
		var index;

		if (input >= 0) {
			index = input;
			page = params.pages[input];
			name = page.name;

			console.log("name is " + name);
			elem = $("#page" + name);

			console.log(elem[0]);
		}
		else if (input.name && input.name.length > 0) {
			for (i in params.pages) {
				if (input.name == params.pages[i].name) {
					index = i;
				}
			}

			page = input;
			name = input.name;
			elem = $("#page" + name);
		}
		else {
			console.log("is coord or jquery");
			console.log(input);
			if (input instanceof jQuery) {

				index = -1;
				name = null;
				page = null;
				elem = input;
			}
			else {

				for (i in params.pages) {

					if (checkCoords(input, i)) {
						index = i;
						page = params.pages[i];
						name = page.name;
						elem = $("#page" + name);
					}
				}
			}
		}

	}

	return {
		setupReceivers:setupReceivers,
		parseInput:parseInput2,
		changeButton:changeButton,
		returnButton:returnButton,
		onScroll:onScroll
	}
}]);




