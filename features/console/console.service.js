consoleModule.factory("con", function() {

	var total = 18;
	var history = [];

	var count = 0;

	var registered = false;

	var conCont;
	var thisCon;

	var register = function (thisConsole) {

		console.log("register");

		registered = true;

		conCont = thisConsole;
		thisCon = conCont.prev();
	}

	var isRegistered = function () {

		return registered;
	}

	var isVisible = function () {

		return thisCon && thisCon.is(":visible");
	}
		
	var refresh = function () {
			
		for (var i = 1; i < history.length; i++) {
			history[i-1] = history[i];
		}
		
		history.splice(history.length-1, 1);
	}
		
	var print = function () {

		var string = "";
		
		thisCon[0].innerHTML = string;
		
		for (i in history) {

			string += history[i] + "<br>";	
		}

		thisCon[0].innerHTML = string;
	}

	var log = function (text) {
		
		if (isVisible()) {

			history[history.length] = count++ + "&nbsp; &nbsp;" + text;
			
			if (history.length == total)
				refresh();
			
			print();
		
		}
		else {
			//console.log("is not visible");
		}
		
	}

	window.onerror = function (msg, url, linenumber) {
		log("Error: " + msg + ", in " + url + " at " + linenumber);
	}

	var attachToConsole = function () {
	    var oldLog = console.log;
	    console.log = function (message) {
	       	log(message);
	        oldLog.apply(console, arguments);
	    };
	}

	var attach = function () {

		if (isVisible()) attachToConsole();
	}

	return {
		register:register,
		isRegistered:isRegistered,
		isVisible:isVisible,
		attach:attach,
		log:log
	}

});