settingsModule.directive("settings", ['states', 'send', 'settings.service', 'utility', function (states, send, settings, g) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"features/settings/settings.html",
		link:function ($scope, element, attr) {


			var setValue = function (val) {

				console.log("set value", val);

		    	$("#amount").html(g.truncate(val*100,0));
		    	g.setFactor(g.c.factorS, val);
		    }

		    var getValue = function () {

		    	return $("#slider-vertical").slider("value");
		    }

		    setTimeout(function () {

		    	$( "#slider-vertical" ).slider({
					orientation: "vertical",
					//range: "min",
					max: 2,
					min: 0.01,
					step:0.01,
					//height:"400px",
					animate:true,
					value: g.getFactor(g.c.factorS),
					slide: function( event, ui ) {
						setValue(ui.value);
					}
			    });

			    setValue(getValue());

		    }, 500);
			
		    

		}
	}

}]);