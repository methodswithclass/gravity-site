nuplaeModule.controller('nuplaeCtrl', ['$document', 'con', 'params', 'navigation' function ($document, con, params, nav) {

	var self = this;

	self.pages = params.pages;

	console.log(self.pages[0].name);

	var init = function () {

    	var home;

    	var body;

    	var complete = function () {

    		console.log("loaded");

			console.log(home[0]);

			nav.open(0, 10);
    	}

    	var timer = setInterval(function () {

    		home = $("#pageHome");

    		if (home[0]) {
    			clearInterval(timer);
    			complete();
    		}

    	}, 10);

	}

    init();


	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	});

}]);