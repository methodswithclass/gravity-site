sharedModule.factory('global', ['$sce', '$location', 'events', function($sce, $location, events) {

	var factor = 1;
	var yDir = 1;
	var xDir = 1;

	var setFactor = function (_factor) {

		//console.log("factor is " + _factor);

		factor = _factor;
	}

	var setDirection = function (direction, value) {

		//console.log(direction + " value is " + value);

		if (direction == "i") {
			xDir = value;
		}
		else if (direction == "j") {
			yDir = value;
		}

	}

	var getFactor = function () {

		return factor;
	}

	var getDirection = function (direction) {

		return direction == "i" ? xDir : yDir;
	}

	var validate = function () {

		var isRegistered = false;

		var timer = setInterval(function () {

			isRegistered = events.dispatch("console");

			console.log(isRegistered);

			if (isRegistered) {

				clearInterval(timer);
				timer = null;
			}


		}, 10);

		if (isRegistered) {

			var desktopdebug = false;
			var checking = "/checking";
			var invalid = "/invalid";
			var valid = "/valid";

			var isValid;

			if (!desktopdebug) {
				console.log("validate");
				isValid = validate.run();
			}
			else {
				isValid = validate.invalidate();
				//$location.path(checking);
			}

			isValid.then( 
			function (path) { //valid
				console.log(path);
				$location.path(path);
				
				$state.transitionTo("Modal.valid");
			},
			function (path) { //invalid
				console.log(path);
				$location.path(path);
			});

		}
	}

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
			annihilate:"annihilate",
			remove:"remove",
			homeIndex:0,
			calibrateIndex:1,
			gravIndex:2,
			floatIndex:3,
			enemiesIndex:4,
			balanceIndex:5,
			spaceIndex:6,
			back:"back",
			body:"body",
			option:"option",
			home:"home",
			dist:10
    	},
    	setFactor:setFactor,
    	setDirection:setDirection,
    	getFactor:getFactor,
    	getDirection:getDirection,
    	isValid:isValid,
    	renderHtml:function (htmlCode) {
	        return $sce.trustAsHtml(htmlCode);
	    }
    } 

}]);