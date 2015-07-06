
nuplaeModule.controller('nuplaeCtrl', ['params', 'nuplaeService', 'states', function (params, nuplaeService, states) {

	var self = this;

	self.pages = params.pages;


	var result = nuplaeService.parseInput(0);

	result.then(
		function (output) {
			states.gotoPage(output.index);
		},
		function (message) {
			console.log(message);
		});



	

	// var init = function () {

	// 	var name = params.pages[0].name;

	// 	//console.log(name);

	// 	var elem;

	// 	var complete = function (elem) {

	// 		console.log("loaded");

			
	// 	}

	// 	var timer = setInterval(function () {

	// 		elem = $("#page" + name);

	// 		//console.log(elem[0]);

	// 		if (elem[0]) {
	// 			clearInterval(timer);
	// 			complete(elem);
	// 		}

	// 	}, 10);

	// }

	

}]);