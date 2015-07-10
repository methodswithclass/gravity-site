sharedModule.factory("events", function () {

	var self = this;

	this.events = {};

	var dispatch = function (name) {

		return self.events[name]();
	}

	var on = function (name, _event) {

		self.events[name] = _event;
	}

	return {
		on:on,
		dispatch:dispatch
	}

});