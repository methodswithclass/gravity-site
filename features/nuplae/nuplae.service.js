nuplaeModule.factory("nuplaeService", function (params) {

	var buttons = [];

	var buttonTouch = function (el, p, complete) {

		var page = p.page;
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

			elem.removeClass(back_save).addClass(back_press);
			elem.removeClass(text_save).addClass(text_press);

			if (add_class) {
				elem.addClass(add_class);
			}
		}

		var returnButton = function () {

			elem.removeClass(back_press).addClass(back_save);
			elem.removeClass(text_press).addClass(text_save);

			if (add_class) {

				elem.removeClass(add_class);
			}
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

		$(window).on("touchmove", function (e) {

			returnButton();
		});

	}

	var checkCoords = function (to, i) {

		return to.top == params.pages[i].page.rect.top && to.left == params.pages[i].page.rect.left;
	}

	var parseInput = function (input) {

		var name;
		var page;
		var elem;
		var index;

		if (input >= 0) {

			index = input;
			page = params.pages[input];
			name = page.name;
			elem = $("#page" + name);
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
				elem = input;
				page = null;
				name = null;
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
		}
	}

	return {
		buttonTouch:buttonTouch,
		parseInput:parseInput
	}
});




