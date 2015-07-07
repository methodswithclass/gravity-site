nuplaeModule.factory("navigation", function (nuplaeService) {

	var body;

	var open = function (to, duration) {

		console.log("nav to " + to);

		var result = nuplaeService.parseInput(to);
		
		body = $("#body");

		body.removeClass("cutoff").addClass("scroll");

		body.scrollTo(result.elem, {
			duration:duration,
			queue:false,
			onAfter:function(target, settings) {
				body.removeClass("scroll").addClass("cutoff");
			}
		});

		// result.then(
		// 	function (output) {

		// 		console.log(output.elem[0]);

				
		// 	}, 
		// 	function (message) {
		// 		console.log(message);
		// 	}
		// );

	}

	return {
		open:open
	}

});