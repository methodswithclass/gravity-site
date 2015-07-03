nuplaeModule.controller('nuplaeCtrl', ['$document', 'con', 'params', 'navigation', function ($document, con, params, nav) {

	var self = this;

	self.pages = params.pages;

	var complete = function (elem) {

		console.log("loaded");

		nav.open(elem, 10);
	}

	var init = function () {

		var name = self.pages[0].name;

		console.log(name);

		var elem;

		var timer = setInterval(function () {

			elem = $("#page" + name);

			console.log(elem[0]);

			if (elem[0]) {
				clearInterval(timer);
				complete(elem);
			}

		}, 10);

	}

	init();
    

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	});

}]);