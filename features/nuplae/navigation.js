nuplaeModule.factory("navigation", function (params) {

	var body;

	var open = function (to, duration) {

		var elem;
		var name;

		console.log(to);

		if (to >= 0) {

			name = params.pages[to].name;
			console.log("is index" + name);
			elem = $("#page" + name);
		}
		else if (to.name && to.name.length > 0) {

			name = to.name;

			console.log("is page " + name);
			elem = $("#page" + name);
		}
		else {
			console.log("is coord or jquery");
			console.log(to);
			elem = to;
		}

		body = $("#body");

		body.addClass("scroll");

		body.scrollTo(elem, {
			duration:duration,
			queue:true,
			onAfter:function(target, settings) {
				body.removeClass("scroll");
			}
		});
	}

	return {
		open:open
	}

});