sharedModule.factory("send", function () {

	var receivers = {};

	var send = function (params) {

		receivers[params.name][params.id] = params.data;

	}

	var receiver = function (params) {

		receivers[params.name] = params.receiver;
	}

	return {

		send:send,
		receiver:receiver
	}

});