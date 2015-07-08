sharedModule.factory("send", function () {

	var receivers = {};

	var names = [];

	var checkName = function (_name) {

		for (i in names) {

			if (_name == names[i]) {

				return true;
			}
		}

		return false;
	}

	var accum = function (params) {

		var name = params.name;
		var id = params.id;

		var bin = receivers[name];

		for (i in bin) {
			bin[i][id] = params.data;
		}

	}

	var receiver = function (params) {

		var name = params.name;

		var doesExist = checkName(name);

		var bin;

		if (!doesExist) {

			bin = []; //create new receiver array for this name
		}
		else {
			bin = receivers[name]; // retrieve existing receiver array for this name
		}

		bin[bin.length] = params.receiver;

		receivers[name] = bin; //reassign bin to receiver
	}

	return {

		accum:accum,
		receiver:receiver
	}

});