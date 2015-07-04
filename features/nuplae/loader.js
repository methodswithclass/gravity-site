nuplaeModule.factory("loader", function (params) {

	var pages = params.pages;

	var loaders = {};
	var names = [];

	var getNames = function () {

		for (i in pages) {

			names[i] = pages[i].name;
		}
	}

	getNames();

	loaders[names[0]] = function () {

		console.log("load " + names[0]);
	}	

	loaders[names[1]] = function () {

		console.log("load " + names[1]);
	}

	loaders[names[2]] = function () {

		console.log("load " + names[2]);
	}

	loaders[names[3]] = function () {

		console.log("load " + names[3]);
	}

	loaders[names[4]] = function () {

		console.log("load " + names[4]);
	}

	loaders[names[5]] = function () {

		console.log("load " + names[5]);
	}

	var load = function (i) {

		loaders[names[i]]();
	}

	return {
		load:load
	}

});