
nuplaeModule.controller('nuplaeCtrl', ['$location', 'validate', '$document', 'params', 'events', 'navigation', function ($location, validate, $document, params, events, nav) {

	var self = this;

	self.pages = params.pages;

	var init = function () {

		var name = params.pages[0].name;

		//console.log(name);

		var elem;

		var complete = function (elem) {

			console.log("loaded");

			nav.open(0, 10);
		}

		var timer = setInterval(function () {

			elem = $("#page" + name);

			//console.log(elem[0]);

			if (elem[0]) {
				clearInterval(timer);
				complete(elem);
			}

		}, 10);

	}

	init();

}]);