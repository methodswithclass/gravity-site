nuplaeModule.factory("navigation", function (nuplaeService) {

	var body;

	var open = function (to, duration) {

		console.log("nav to " + to);

		var result = nuplaeService.parseInput(to);

		body = $("#body");

		result.then(
			function (output) {

				body.removeClass("cutoff").addClass("scroll");

				body.scrollTo(output.elem, {
					duration:duration,
					queue:false,
					onAfter:function(target, settings) {
						body.removeClass("scroll").addClass("cutoff");
					}
				});
			}, 
			function (message) {
				console.log(message);
			}
		);

	}

	return {
		open:open
	}

});