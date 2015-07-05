app.factory("stateService", function ($stateProvider, validate, $location, $state) {

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
	        onEnter: function() {
	              
	              var close = function () {

	                 $state.go("Default");
	              }

	              var timer = setTimeout(function () {
	                  close();
	              }, 1000);

	          },

	          
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
	      	onEnter:function() {
	              
	              var close = function () {

	                 $state.go("Default");
	              }

	              var timer = setTimeout(function () {
	                  close();
	              }, 1000);

	          },

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

	}

	return {
		setup:setup
	}




});