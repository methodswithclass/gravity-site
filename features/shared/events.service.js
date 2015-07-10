sharedModule.factory("events", function () {

	var self = this;

	this.events = {};
	this.names = {};

	var checkName = function (_name) {

		for (i in names) {

			if (_name == names[i]) {

				return true;
			}
		}

		return false;
	}

	var dispatch = function (name) {

		var bin = self.events[name];

		for (i in bin) {
			return bin[i]();
		}
	}

	var on = function (name, _event) {

		var bin;

		if (!checkName(name)) {

			bin = []; //create new receiver array for this name
		}
		else {
			bin = self.events[name]; // retrieve existing receiver array for this name
		}

		bin[bin.length] = _event;

		self.events[name] = bin;

		self.names[self.names.length] = name;
	}

	return {
		on:on,
		dispatch:dispatch
	}

});