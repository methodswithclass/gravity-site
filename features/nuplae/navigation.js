nuplaeModule.factory("navigation", function (params) {

	var open = function (to, duration) {

		var elem

		if (typeof to == Number) {
			elem = $("#page" + params.pages[to].name); 
		}
		else if (typeof to.name == String) {
			elem = $("#page" + to.name);
		}
		else {
			elem = to;
		}

		var body = $("#body");

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