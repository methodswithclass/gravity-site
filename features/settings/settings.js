settingsModule.directive("settings", ['states', 'send', 'settings.service', 'utility', function (states, send, settings, g) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"features/settings/settings.html",
		link:function ($scope, element, attr) {


			$( "#slider-vertical" ).slider({
				orientation: "vertical",
				range: "min",
				min: 0,
				max: 100,
				height:"400px",
				value: g.getSessionFactor()*100,
				slide: function( event, ui ) {
					$( "#amount" ).val( ui.value );
				}
		    });

		    $( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );

		}
	}

}]);