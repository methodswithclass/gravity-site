objectModule.factory("object.generator", function () {


	var cross = function (parent, params) {

		var vertical = document.createElement("div");
		var horizontal = document.createElement("div");

		vertical.style.position = "absolute";
		vertical.style.top = 0;
		vertical.style.left = "50%";
		vertical.style.width = "2px";
		vertical.style.height = "100%";
		vertical.style.backgroundColor = params.color2;

		horizontal.style.position = "absolute";
		horizontal.style.top = "50%";
		horizontal.style.left = 0;
		horizontal.style.width = "100%";
		horizontal.style.height = "2px";
		horizontal.style.backgroundColor = params.color2;

		parent.append(vertical);
		parent.append(horizontal);

	}

	return {
		cross:cross
	}

});