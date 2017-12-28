interfaceModule.directive("repeat", ['send.service', function (send) {

	return function (scope, element, attr) {

		send.retrieve.accum({name:attr.dir, id:attr.id, data:element[0]});

		var ww;
		var wh;



		var setSize = function () {


			ww = $(window).width();
			wh = $(window).height();

			element.css({width:ww, height:wh});

		}


		setTimeout(function () {

			setSize();

			$(window).resize(function () {

				setSize();
			});

		}, 300);
		
	}
}]);