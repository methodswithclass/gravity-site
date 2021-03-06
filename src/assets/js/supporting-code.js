
var captureError = function (err) {

	console.log(err);

	return true;
}

// distinguish between a few popular mobile user agents, desktop agents, and IE
var isChrome = function (forceChrome) {

	if (navigator.userAgent.indexOf('Chrome') != -1) {

		return forceChrome || true;
	}

	return false;

}


var getAngularModules = function (application) {

	// console.log("application is", application);

	// application.directive('onTap', function () {
	// 	return function (scope, element, attrs) {
	// 		return $(element).hammer({
	// 			    prevent_default: true,
	// 			    time:1
	// 			})
	// 			.bind("tap", function (ev) {
	// 			    return scope.$apply(attrs['onTap']);
	// 			});
	// 	};
	// });



	application.factory("general", ["$sce", function ($sce) {


		return {
			renderHtml:function (htmlCode) {
	        	return $sce.trustAsHtml(htmlCode);
	    	}
		}

	}])



	application.factory('exception', [function () {
	    


	    var catcher = function (message) {
	        return function(reason) {
	            console.log(message, reason);
	        };
	    }


	    return {
	        catcher: catcher
	    };
	}]);


	window.onerror = function (msg, url, lineNo, columnNo, error) {
	  // var error = e.error;
	  captureError(error);

	  return true;
	}

}
