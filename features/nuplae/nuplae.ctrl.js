nuplaeModule.controller('nuplaeCtrl', ['$document', 'con', 'params', function ($document, con, params) {

	var self = this;

	self.pages = params.pages;

	console.log(self.pages[0].name);



	var init = function () {

    	var home;

    	var body;

    	var complete = function () {

    		console.log("loaded");

    		var body = $("#body");

			console.log(home[0]);

			console.log(body[0]);

			body.animate({top:0, left:"-100%"},10);
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