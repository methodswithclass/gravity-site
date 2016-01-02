
uiModule.controller('nuplaeCtrl', ['$document', 'data.service', 'validate.wrapper', 'buttonService', 'states', 'events', 'con', '$location', 'utility', 'manager', function ($document, data, checkDevice, buttons, states, events, con,  $location, g, manager) {

	console.log("open nuplae controller");

	var self = this;

	// ===================== DATA ======================

	self.pages = data.pages;

	var makeHomeData = function () {

		var home = {
			name:"Home",
			index:g.c.homeIndex,
			motion:false,
			game:false,
			page:{
				view:"home.html",
				back:"blue2-back",
				fore:"white-back",
				rect:{
					top:0,
					left:"25%"
				},
				border:{
					color:"black",
					width:1,
					radius:0
				}
			}
			
		}

		var options = [];

		for (i in self.pages) {

			options[i] = {
				name:self.pages[i].name,
				index:self.pages[i].index,
				menu:self.pages[i].page.menu,
				rect:self.pages[i].page.rect,
				directive:g.c.option
			};

		};

		home.pages = options;

		self.pages.unshift(home);

	}

	makeHomeData();


	// ===================== SETUP ======================

	states.define();

	buttons.setupReceivers();

	manager.setupReceivers();



	// ===================== EVENTS ======================

	events.on("loaded", function () {

		console.log("loaded event dispatch");

		//buttons.setupCheckScroll();

		states.gotoPage(1);

	});

	events.on("console", function () {

		//console.log("console event dispatch");

		return con.isRegistered();
	});



	// ===================== VALIDATE ======================

	var result = checkDevice.run();

	result.then( 
	function (path) { //valid
		//console.log("change location to " + path);
		$location.path(path);
	},
	function (path) { //invalid
		//console.log("change location to " + path);
		$location.path(path);
		states.showModal({modal:"invalid", time:1500});
	});



	// ===================== ON READY ======================

	angular.element($document).ready(function () {

		//console.log("document ready");

		con.register($("#consoleContainer"));

		con.attach();
	
	});

	

	

	

	

}]);