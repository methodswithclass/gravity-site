sharedModule.factory('global', ['$sce', '$location', function($sce, $location) {

	

	var isValid = function () {

		//console.log($location.url());

		if ($location.url() == "/valid") {	
			return true;
		}

		return false;

	}

    return {
    	c:{
			playAsset:"img/play.png",
			stopAsset:"img/stop.png",
			backAsset:"img/back.png",
			loadingAsset:"img/loading.png",
			landClockwise:"landClockwise",
			portrait:"portrait",
			circle:"circle",
			square:"square",
			cross:"cross",
			homeIndex:0,
			calibrateIndex:1,
			gravIndex:2,
			floatIndex:3,
			enemiesIndex:4,
			balanceIndex:5,
			spaceIndex:6
    	},
    	isValid:isValid,
    	renderHtml:function (htmlCode) {
	        return $sce.trustAsHtml(htmlCode);
	    }
    } 

}]);