nuplaeModule.factory("nuplaeService", ['$q', 'params', 'send', 'global', function ($q, params, send, g) {

	var dist = 0;
	var down = false;

	var body = {};
	var options = {};
	var backs = {};

	var element;


	var setupReceivers = function () { 

		console.log("setup receivers");
		
		send.receiver({name:g.c.body, receiver:body});
		send.receiver({name:g.c.option, receiver:options});
		send.receiver({name:g.c.back, receiver:backs});
	}

	var buttonTouch = function (p) {

		var type = p.type;
		var name = p.name;
		var back_press = p.back_press;
		var back_save = p.back_save;
		var text_press = p.text_press;
		var text_save = p.text_save;
		var add_class = p.add_class;
		var complete = p.complete;

		console.log("bind type:" + type + " of:" + name);

		switch (type) {

			case g.c.option:
				element = options;
			break;

			case g.c.back:
				element = backs;
			break;
		}


		var elem;
		var bodyElem;

		var mc;
		var bocyMc;

		try {

			elem = $(element[name]);
			bodyElem = $(body[g.c.body]);

			mc = new Hammer(elem[0]);
			bodyMc = new Hammer(bodyElem[0]);
		}
		catch(e) {
			return false;
		}

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

			changeButton();

		});

		mc.on("pressup tap", function (e) {

			returnButton();

			complete();
		});

		bodyMc.on("panup panDown", function (e) {

			if (Math.abs(e.y) > 10) {
				returnButton();
			}
		});


		return true;
		

	}
	
	var bindBackButton = function () {

		bindInner(1).then(function (result) {
			return if (result) bindInner(2);
		}, 
		function (result) {
			console.log("");
		}).then(function (result))
	}

	var bindInner = function (i) {

		return $q(function (resolve, reject) {

			game = params.pages[i];

			//console.log("bind back button for:" + game.name);

			result = buttonTouch({
				type:"back",
				name:"back" + game.name,
				back_press:"black-back",
				back_save:"white-back",
				add_class:"fa-inverse",
				complete:function () {
					states.gotoPage(0);
				}
			});

			if (result) resolve({index:i, name:game.name, result:result});
			else reject({index:i, name:game.name, result:result});

		});
	}

	var bindBackButtons = function () {

		bindInner(1).then(function (output) {
			console.log("bind for:" + output.name + " was " + output.result);
			return if (output.result) bindInner(output.index + 1);
		}, 
		function (output) {
			console.log("bind for:" + output.name + " was " + output.result);
			return output;
		}).then(function (output) {
			console.log("bind for:" + output.name + " was " + output.result);
			return if (output.result) bindInner(output.index + 1);
		}, 
		function (output) {
			console.log("bind for:" + output.name + " was " + output.result);
			return output;
		}).then(function (output) {
			console.log("bind for:" + output.name + " was " + output.result);
			return if (output.result) bindInner(output.index + 1);
		}, 
		function (output) {
			console.log("bind for:" + output.name + " was " + output.result);
			return output;
		}).then(function (output) {
			console.log("bind for:" + output.name + " was " + output.result);
			return if (output.result) bindInner(output.index + 1);
		}, 
		function (output) {
			console.log("bind for:" + output.name + " was " + output.result);
			return output;
		}).then(function (output) {
			console.log("bind for:" + output.name + " was " + output.result);
			return if (output.result) bindInner(output.index + 1);
		}, 
		function (output) {
			console.log("bind for:" + output.name + " was " + output.result);
			return output;
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
		buttonTouch:buttonTouch,
		bindBackButtons:bindBackButtons,
		parseInput:parseInput2
	}
}]);




