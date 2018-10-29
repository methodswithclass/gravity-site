controllerModule.controller("home.controller", ["$scope", "data.service", "cookie.service", "utility.service", function ($scope, data, cookie, u) {

	var shared = window.shared;
	var g = shared.utility_service;
	var events = shared.events_service;

	//console.log(" ");
    console.log("home controller");

    var cookieValues = {
    	t:"true",
    	f:"false"
    }

    $scope.hidemessage = false;


    var setCookie = function () {

    	

	    var homeCookie = cookie.getCookie(u.c.hmKey);

	    console.log("home cookie", homeCookie);

	    u.homeMessage.set(homeCookie == cookieValues.f ? false : true);

	    var utilityValue = u.homeMessage.get();

	    console.log("utility value", utilityValue);

	    $scope.hidemessage = utilityValue;

	    cookie.setCookie(u.c.hmKey, cookieValues.t);
	    u.homeMessage.set(cookieValues.t);

	}


	events.on("homeMessage", function () {

		setCookie();

	});

    $scope.page = data.getPageById("home");

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


    $scope.togglemessage = function (action) {

        $scope.hidemessage = action == 'hide';
    }



}]);