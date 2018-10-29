controllerModule.controller("home.controller", [function () {

	//console.log(" ");
    console.log("home controller");


    var removeTitle = function () {

    	$("#home-scroll").scroll(function (e) {

    		var scrollHeight = $("#optionre-calibrate").offset().top;

    		// console.log("scroll", scrollHeight);

    		if (scrollHeight < 0) {
    			$("#pagetitlehome").hide();
    		}
    		else {
    			$("#pagetitlehome").show();
    		}
    	})
    }

    removeTitle();





}]);