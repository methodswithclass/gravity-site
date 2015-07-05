nuplaeModule.factory("stateManager", function ($stateProvider, validate, $location, $state) {

	var setup = function () {

		console.log("setup");

		$stateProvider.state("Default", {}).
	      state({
	        name:"Modal", 
	        views:{
	            "modal": {
	              templateUrl: "features/modal/modal.html"
	            }
	        },
	        onEnter: ["$state", function($state) {
	              
	              var close = function () {

	                 $state.go("Default");
	              }

	              var timer = setTimeout(function () {
	                  close();
	              }, 1000);

	          }],

	          
	          abstract: true
	  
	      }).
	      state({
	        name:"Modal.valid",
	        views:{
	            "modal": {
	              templateUrl: "features/nuplae/valid-modal.html"
	            }
	      	}
	      }).
	      state({
	      	name:"Page",
	      	onEnter:["$state", function($state) {
	              
	              var close = function () {

	                 $state.go("Default");
	              }

	              var timer = setTimeout(function () {
	                  close();
	              }, 1000);

	          }],

	          abstract:true
	      }).
	      state({
	      	name:"Page.Calibrate"
	      }).
	      state({
	      	name:"Page.Gravity"
	      }).
	      state({
	      	name:"Page.Float"
	      }).
	      state({
	      	name:"Page.Enemies"
	      }).
	      state({
	      	name:"Page.Balance"
	      }).
	      state({
	      	name:"Page.Space"
	      });


	    var isRegistered = false;

		var timer = setInterval(function () {

			isRegistered = events.dispatch("console");

			console.log(isRegistered);

			if (isRegistered) {

				clearInterval(timer);
				timer = null;
			}


		}, 10);

		if (isRegistered) {

			var desktopdebug = false;
			var checking = "/checking";
			var invalid = "/invalid";
			var valid = "/valid";

			var isValid;

			if (!desktopdebug) {
				console.log("validate");
				isValid = validate.run();
			}
			else {
				isValid = validate.invalidate();
				//$location.path(checking);
			}

			isValid.then( 
			function (path) { //valid
				console.log(path);
				$location.path(path);
				
				$state.transitionTo("Modal.valid");
			},
			function (path) { //invalid
				console.log(path);
				$location.path(path);
			});

		}

	}

	return {
		setup:setup
	}




});