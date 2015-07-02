app.factory('global', ['$sce', '$location', function($sce, $location) {


	var isValid = function () {

		//console.log($location.url());

		if ($location.url() == "/valid") {	
			return true;
		}

		return false;

	}

    return {
    	isMobile:isMobile,
    	renderHtml:function (htmlCode) {
	        return $sce.trustAsHtml(htmlCode);
	    }
    }; 

}]);