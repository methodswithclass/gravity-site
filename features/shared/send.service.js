sharedModule.factory("send", function () {

	var receivers = {};

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

		var bin = receivers[name];

		if (bin && bin.length > 0) {

			bin[bin.length] = params.receiver;
		}
		else {
			bin = [];
		}

		receivers[name] = bin;
	}

	return {

		accum:accum,
		receiver:receiver
	}

});