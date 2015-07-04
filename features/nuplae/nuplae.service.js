nuplaeModule.factory("nuplaeService", function (params, navigation) {

	var init = function () {

		var name = params.pages[0].name;

		console.log(name);

		var elem;

		var complete = function (elem) {

			console.log("loaded");

			navigation.open(elem, 10);
		}

		var timer = setInterval(function () {

			elem = $("#page" + name);

			//console.log(elem[0]);

			if (elem[0]) {
				clearInterval(timer);
				complete(elem);
			}

		}, 10);

	}

	var checkCoors = function (to, i) {

		return to.top == params.pages[i].page.rect.top && to.left == params.pages[i].page.rect.left;
	}

	var parseInput = function (input) {

		var name;
		var page;
		var elem;

		if (input >= 0) {

			page = params.pages[to];
			name = page.name;
			elem = $("#page" + name);
		}
		else if (to.name && to.name.length > 0) {

			page = to;
			name = to.name;
			elem = $("#page" + name);
		}
		else {
			console.log("is coord or jquery");
			console.log(to);
			if (to instanceof jQuery) elem = to;
			else {

				for (i in params.pages) {

					if (checkCoords(to, i)) {
						page = params.pages[i];
						name = page.name;
						elem = $("#page" + name); 
					}
				}
			}
			
		}

		return {

			name:name,
			page:page,
			elem:elem
		}
	}

	return {

		init:init,
		parseInput:parseInput
	}
})