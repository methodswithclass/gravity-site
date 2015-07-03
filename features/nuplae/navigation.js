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

		console.log(to);

		if (to >= 0) {

			console.log("is index");
			elem = $("#page" + params.pages[to].name); 
		}
		else if (to.name.length > 0) {

			console.log("is page");
			elem = $("#page" + to.name);
		}
		else {
			console.log("is coord");
			elem = to;
		}

		var timer = setInterval(function () {

			console.log("check");

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