nuplaeModule.factory("navigation", function (nuplaeService) {

	var body;

	var open = function (to, duration) {

		var result = nuplaeService.parseInput(to);

		body = $("#body");

		body.removeClass("cutoff").addClass("scroll")

		body.scrollTo(result.elem, {
			duration:duration,
			queue:true,
			onAfter:function(target, settings) {
				body.removeClass("scroll").addClass("cutoff");
			}
		});
	}

	return {
		open:open
	}

});