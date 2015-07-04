consoleModule.factory("con", function() {

	var total = 18;
	var history = [];

	var count = 0;

	var conCont;
	var thisCon;

	var register = function (thisConsole) {

		console.log("register");

		conCont = thisConsole;
		thisCon = conCont.prev();
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
	    var oldLog = window.console.log;
	    window.console.log = function (message) {
	       	log(message);
	        oldLog.apply(window.console, arguments);
	    };
	}

	attachToConsole();

	return {
		register:register,
		isVisible:isVisible,
		log:log
	}

});