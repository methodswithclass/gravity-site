nuplaeModule.factory("navigation", function (nuplaeService) {

	var body;

	var open = function (to, duration) {

		console.log("nav to " + to);

		body = $("#body");

		var result = nuplaeService.parseInput(to);

		var elem = $("#page" + result.name);

		console.log("#page" + result.name);

		console.log(elem[0]);

		console.log(result.elem[0]);

		console.log(body[0]);

		body.removeClass("cutoff").addClass("scroll");

		body.scrollTo(elem, {
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