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

			console.log("accum: " + name + " id: " + id + " i: " + i + " data:" + params.data);
			//console.log(params.data); 

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

		console.log("receive " + name + " bin size: " + bin.length);

		bin[bin.length] = params.receiver;

		receivers[name] = bin; //reassign bin to receiver

		names[names.length] = name;
	}

	return {

		accum:accum,
		receiver:receiver
	}

});