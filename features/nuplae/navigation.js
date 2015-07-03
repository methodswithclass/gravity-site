nuplaeModule.factory("navigation", function (params) {

	var body;

	var complete = function () {

		console.log("loaded");

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


	var open = function (to, duration) {

		var elem;
		var name;

		console.log(to);

		if (to >= 0) {

			name = params.pages[to].name;
			console.log("is index" + name);
			elem = $("#page" + name);
		}
		else if (to.name.length > 0) {

			name = to.name;

			console.log("is page " + name);
			elem = $("#page" + name);
		}
		else {
			console.log("is coord ");
			console.log(to);
			elem = to;
		}

		var timer = setInterval(function () {

			//console.log("check");

			console.log(elem[0]);

			if (elem[0]) {
				clearInterval(timer);
				complete();
			}

		}, 10);
	}

	return {
		open:open
	}

});