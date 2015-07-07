sharedModule.factory("send", function () {

	var receivers = {};

	var accum = function (params) {

		if (params.multiple) {

			receivers[params.name][params.id] = params.data;

		}
		else {
			receivers[params.name] = params.data;
		}
	}

	var receiver = function (params) {

		receivers[params.name] = params.receiver;
	}

	return {

		accum:accum,
		receiver:receiver
	}

});