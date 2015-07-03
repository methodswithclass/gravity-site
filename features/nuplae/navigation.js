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

		var elem

		if (to >= 0) {
			elem = $("#page" + params.pages[to].name); 
		}
		else if (to.name.length > 0) {
			elem = $("#page" + to.name);
		}
		else {
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