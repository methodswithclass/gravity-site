balanceModule.factory("meter", function () {
	
	var meter = function (input) {

		var self = this;

		var max = input.max;
		var start = input.start;
		var current = start;
		var percent = current/max;

		var temp = current;

		var container = document.createElement("div");
		$(container).addClass("absolute width-30 right-20 border");
		container.style.bottom = "250px";
		container.style.height = $(input.parent).height() - 250 - 20 + "px";

		var meter = document.createElement("div");
		$(meter).addClass("absolute bottom0 width");

		$(container).append(meter);

		$(input.parent).append(container);

		var update = function (tick) {

			current += tick;

			percent = current/max;

			if (percent < 0) {
				percent = 0;
				current = 0;
			}
			else if (percent > 100) {
				percent = 100;
				current = max;
			}

			//console.log("current meter " + current);

			//console.log("meter percent: " + percent);

			meter.style.height = (percent*100) + "%";
			meter.style.backgroundColor = 'rgb(' + [Math.floor(percent*255),Math.floor((1-percent)*255),0].join(',') + ')';

		}

		self.tick = function (_tick) {

			update(_tick);

		}

		self.check = function () {

			if (current >= max) {
				return -1;
			}
			else if (current <= 0) {
				return 1;
			}

			return 0;
		}

		self.reset = function () {

			current = start;
			percent = current/max;

			update(current);
		}

		update(current);

	}

	return meter;

});