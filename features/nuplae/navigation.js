nuplaeModule.factory("navigation", function (nuplaeService, loader) {

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

				//console.log(result.index);

				loader.load(result.index);
			}
		});
	}

	return {
		open:open
	}

});