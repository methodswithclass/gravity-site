sharedModule.factory("send", function () {

	var receivers = {};

	var accum = function (params) {

		receivers[params.name][params.id] = params.data;

	}

	var receiver = function (params) {

		receivers[params.name] = params.receiver;
	}

	return {

		accum:accum,
		receiver:receiver
	}

});