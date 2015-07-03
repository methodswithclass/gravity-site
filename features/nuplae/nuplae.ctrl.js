nuplaeModule.controller('nuplaeCtrl', ['$document', 'con', 'params', function ($document, con, params) {

	var self = this;

	self.pages = params.pages;

	console.log(self.pages[0].name);
	
	var init = function () {

    	var home = $("#pageHome");

		var body = $("#body");

		console.log(home[0]);

		console.log(body[0]);

		body.scrollTo(home,10);
    }


    init();


	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	});

}]);