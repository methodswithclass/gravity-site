nuplaeModule.factory("nuplaeService", function (params) {


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
		parseInput:parseInput
	}
});




