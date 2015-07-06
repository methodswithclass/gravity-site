nuplaeModule.factory("navigation", function (nuplaeService) {

	var body;

	var open = function (to, duration) {

		var result = nuplaeService.parseInput(to);

		result.then(
			function (output) {
				body = $("#body");

				body.removeClass("cutoff").addClass("scroll")

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