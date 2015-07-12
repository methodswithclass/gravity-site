nuplaeModule.factory("buttonService", ['params', 'send', 'global', 'states', 'events', function (params, send, g, states, events) {

	var self = this;

	
	var options = {};
	var backs = {};

	this.home;
	this.start = 0;
	this.scrollThreshold = 2;
	this.down = false;

	var setupReceivers = function () { 

		console.log("setup receivers");
		
		//send.receiver({name:g.c.home, receiver:home});
		send.receiver({name:g.c.option, receiver:options});
		send.receiver({name:g.c.back, receiver:backs});
	}

	var parseId = function (args) {

		var array = args.name.split(".");
		var returnObj;

		//console.log(array);

		if (array.length > 1) {
			returnObj = {
				element:array[0],
				name:array[1]
			}
		}
		else {
			returnObj = {
				name:args.name
			}
		}

		//console.log(returnObj);


		return returnObj;

	}

	var getIndexByName = function (args) {

		var pages = params.pages;
		var names = parseId(args);

		//console.log(args);
		//console.log(args.name);

		if (names.name) {
			for (i in pages) {

				if (names.name == pages[i].name) {
					return i;
				}
			}
		}

		return -1;
	}

	var getOptionObject = function (args) {

		var index = getIndexByName(args);

		var page = params.pages[index];

		return {
			type:"option",
			name:"option" + page.name,
			back_press:"orange-back",
			back_save:page.page.menu,
			add_class:"lowered",
			text_press:"white",
			text_save:"white",
			complete:function () {
				states.gotoPage(page.index);
			}
		}
	}

	var getBackObject = function (args) {

		var index = getIndexByName(args);

		var page = params.pages[index];

		return {
			type:"back",
			name:"back" + page.name,
			back_press:"black-back",
			back_save:"white-back",
			add_class:"fa-inverse",
			complete:function () {
				console.log("go back");
				states.gotoPage(0);
			}
		}
	}

	var getThing = function (type, args) {

		var names = parseId(args);
		var name;
		var which;

		if (args.isId) { 
			name = names.name;
			which = names.element;
		} 
		else { 
			name = args.name;
			which = "option";
		}

		if (type == "element") {

			if (which == "option") {
				return options[args.name];
			}
			
			return backs[args.name];
		}
		else if (type == "object") {

			if (which == "option") {
				return getOptionObject(args);
			}
			
			return getBackObject(args);
		}
	}

	var changeButton = function (args) {

		console.log("change " + args.name);

		var p = getThing("object", args);
		var elem = $(getThing("element", args));

		console.log(p);
		console.log(elem[0]);

		if (p && elem) {

			console.log("change has object");

			if (p.back_press && p.back_save) elem.removeClass(p.back_save).addClass(p.back_press);
			if (p.text_press && p.text_save) elem.removeClass(p.text_save).addClass(p.text_press);
			if (p.add_class) elem.addClass(p.add_class);

		}

	}

	var returnButton = function (args) {

		console.log("return " + args.name);

		var p = getThing("object", args);
		var elem = $(getThing("element", args));

		if (p && elem) {

			console.log("return has object");

			if (p.back_press && p.back_save) elem.removeClass(p.back_press).addClass(p.back_save);
			if (p.text_press && p.text_save) elem.removeClass(p.text_press).addClass(p.text_save);
			if (p.add_class) elem.removeClass(p.add_class);
		}
	}

	var callReturn = function (args) {

		var index;
		var pages;
		self.down = false;

		var otherParams;

		if (args.others) {
			index = getIndexByName(args);
			pages = params.pages;

			for (i in pages) {

				otherArgs = {
					name:pages[i].name,
					isId:false
				}

				if (i != 0 && i != index) returnButton(otherArgs);
			}
		}
		else {
			returnButton(args);
			getThing("object", args).complete();
		}

	}

	var callChange = function (args) {

		self.start = self.home.scrollTop();
		self.down = true;

		changeButton(args);

		if(args.others) callReturn(args);

	}

	this.scrollFunc = function () {

		console.log("scroll " + self.down);

		if (self.down && Math.abs(self.home.scrollTop() - self.start) > self.scrollThreshold) {
			self.down = false;
			callReturn({others:true});
			
		}

	}

	var setupCheckScroll = function () {

		self.home = events.dispatch("home");

		self.home.addeventListener("scroll", self.scrollFunc);
	}

	return {
		setupReceivers:setupReceivers,
		callReturn:callReturn,
		callChange:callChange,
		setupCheckScroll:setupCheckScroll

	}

}]);




