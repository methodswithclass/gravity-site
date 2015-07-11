nuplaeModule.factory("buttonService", ['params', 'send', 'global', 'states', 'events', function (params, send, g, states, events) {


	var home;
	var options = {};
	var backs = {};

	var start = 0;
	var scrollThreshold = 2;
	var down = false;

	var getIndexByName = function (name) {

		var pages = params.pages;

		if (name) {
			for (i in pages) {

				if (name == pages[i].name) {
					return i;
				}
			}
		}

		return -1;
	}

	var setupReceivers = function () { 

		console.log("setup receivers");
		
		//send.receiver({name:g.c.home, receiver:home});
		send.receiver({name:g.c.option, receiver:options});
		send.receiver({name:g.c.back, receiver:backs});
	}

	var getOptionObject = function (name) {

		var index = getIndexByName(name);

		var page = params.pages[index];

		return {
			type:"option",
			name:"option" + page.name,
			back_press:"orange-back",
			back_save:page.menu,
			add_class:"lowered",
			text_press:"white",
			text_save:"white",
			complete:function () {
				states.gotoPage(page.index);
			}
		}
	}

	var getBackObject = function (name) {

		var index = getIndexByName(name);

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

	var getThing = function (type, id) {

		var nameArray = id.split(".");
		var element = nameArray[0];
		var name = nameArray[1];

		if (type == "element") {
			if (nameArray[0] == "option") {
				return options[id];
			}
			
			return backs[id];
		}
		else if (type == "object") {
			if (nameArray[0] == "option") {
				return getOptionObject(name);
			}
			
			return getBackObject(name);
		}
	}

	var changeButton = function (name) {

		console.log("change button");

		var p = getThing("object", name);
		var elem = $(getThing("element", name));

		if (p && elem) {

			console.log("change has object");

			if (p.back_press && p.back_save) elem.removeClass(p.back_save).addClass(p.back_press);
			if (p.text_press && p.text_save) elem.removeClass(p.text_save).addClass(p.text_press);
			if (p.add_class) elem.addClass(p.add_class);

		}

	}

	var returnButton = function (name) {

		console.log("return button");

		var p = getThing("object", name);
		var elem = $(getThing("element", name));

		if (p && elem) {

			console.log("return has object");

			if (p.back_press && p.back_save) elem.removeClass(p.back_press).addClass(p.back_save);
			if (p.text_press && p.text_save) elem.removeClass(p.text_press).addClass(p.text_save);
			if (p.add_class) elem.removeClass(p.add_class);
		}
	}

	var callReturn = function (except_name) {

		var pages = params.pages;
		down = false;

		for (i in pages) {
			returnButton(pages[i].name);
		}
		
		if (except_name) getThing("object", except_name).complete();

	}

	var callChange = function (name) {

		start = home.scrollTop();
		down = true;

		changeButton(name);

		callReturn(name);

	}

	var scrollFunc = function () {

		console.log("scroll");

		if (down && Math.abs(home.scrollTop() - start) > scrollThreshold) {

			callReturn();
		}

	}

	var setupCheckScroll = function () {

		home = $(events.dispatch("home"));

		home.on("scroll", scrollFunc);
	}

	return {
		setupReceivers:setupReceivers,
		callReturn:callReturn,
		callChange:callChange,
		setupCheckScroll:setupCheckScroll

	}

}]);




