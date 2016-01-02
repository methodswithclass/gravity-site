uiModule.factory("buttonService", ['data.service', 'send', 'utility', 'states', 'events', function (params, send, g, states, events) {

	var self = this;

	
	var options = {};
	var backs = {};

	this.home;
	this.start = 0;
	this.scrollThreshold = 2;
	this.down = false;

	var setupReceivers = function () { 

		console.log("setup receivers");
		
		//send.receiver({name:g.c.home, receiver:home});
		send.receiver({name:g.c.option, receiver:options});
		send.receiver({name:g.c.back, receiver:backs});
	}

	var parseId = function (args) {

		var array = args.name.split(".");
		var returnObj;

		//console.log(array);

		if (array.length > 1) {
			returnObj = {
				element:array[0],
				name:array[1]
			}
		}
		else {
			returnObj = {
				name:args.name
			}
		}

		//console.log(returnObj);


		return returnObj;

	}

	var getIndexByName = function (args) {

		var pages = params.pages;
		var names = parseId(args);

		//console.log(args);
		//console.log(args.name);

		if (names.name) {
			for (i in pages) {

				if (names.name == pages[i].name) {
					return i;
				}
			}
		}

		return -1;
	}

	var buttonAction = function (args) {

		var index = getIndexByName(args);

		var page = params.pages[index];

		states.gotoPage(page.index);

	}

	return {
		setupReceivers:setupReceivers,
		buttonAction:buttonAction

	}

}]);




