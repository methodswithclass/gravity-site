app.factory('global', ['$sce', '$location', function($sce, $location) {


	var isMobile = function () {

		//console.log($location.url());

		if ($location.url() == "/mobile") {	
			return true;
		}

		return false;

	}

	var sep = function (project) {

		var percent;

		if (isMobile()) {
			percent = 0.3;
		}
		else {
			percent = 0.6;
		}

		var windowWidth = 1600;
		var sep = project.maxSep;
		var factor = windowWidth/$(window).width()/percent;

		return factor*sep;
	}

    return {
    	sep:sep,
    	isMobile:isMobile,
    	renderHtml:function (htmlCode) {
	        return $sce.trustAsHtml(htmlCode);
	    }
    }; 

}]);