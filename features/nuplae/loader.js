nuplaeModule.factory("loader", function (params) {

	var pages = params.pages;

	var loaders = {};
	var names = [];

	var getNames = function () {

		for (i in pages) {

			names[i] = pages[i].name;
		}
	}

	loaders[names[0]] = function () {


	}

	loaders[names[1]] = function () {


	}

	loaders[names[2]] = function () {


	}

	loaders[names[3]] = function () {


	}

	loaders[names[4]] = function () {


	}

	loaders[names[5]] = function () {


	}

	var load = function (i) {

		loaders[names[i]]();
	}

	return {
		load:load
	}

});