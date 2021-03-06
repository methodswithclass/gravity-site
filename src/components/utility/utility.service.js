utilityModule.factory("utility.service", [function () {

	var vector = mcaccel.vector;



	var con = {
		nextState:"page.calibrate",
		proceedToNextState:true,
		valid:"valid",
		invalid:"invalid",
		portrait:"portrait",
        landscape: "landscape",
        image:"image",
		circle:"circle",
		square:"square",
        cross: "cross",
        hmKey:"homeMessageKey",
        objKey: "objCookieKey",
        objSizeKey: "objSizeCookieKey",
        factorKey: "factorCookieKey",
        sessionFactorKey: "seessionFactorCookieKey",
        axisYKey: "axisYCookieKey",
        axisXKey: "axisXCookieKey",
        factorDoneKey: "factorDoneCookieKey",
        axisDoneKey: "axisDoneCookieKey",
        done:"doneCookieValue",
		annihilate:"annihilate",
		remove:"remove",
		indexes:{
			home:0,
			calibrate:1,
			gravtiy:2,
			float:3,
			enemies:4,
			balance:5,
			space:6,
			settings:7,
			validate:8
		},
		colors:{
			scheme1:{
				color1:{
					color:"color1",
					back:"color1-back"
				},
				color2:{
					color:"color2",
					back:"color2-back"
				},
				color3:{
					color:"color3",
					back:"color3-back"
				},
				color4:{
					color:"color4",
					back:"color4-back"
				},
				color5:{
					color:"color5",
					back:"color5-back"
				},
				color6:{
					color:"color6",
					back:"color6-back"
				},
				color7:{
					color:"color7",
					back:"color7-back"
				},
			},
			scheme2:{
				color1:{
					color:"color-2-1",
					back:"color-2-1-back"
				},
				color2:{
					color:"color-2-2",
					back:"color-2-2-back"
				},
				color3:{
					color:"color-2-3",
					back:"color-2-3-back"
				},
				color4:{
					color:"color-2-4",
					back:"color-2-4-back"
				},
				color5:{
					color:"color-2-5",
					back:"color-2-5-back"
				},
			}
		},
		pageHeights:{
			chrome:"pageHeight-chrome",
			regular:"pageHeight"
		},
		borders:{
			scheme1:{
				black:{
					outline:"black-outline black-corner",
					border:"black-outline",
					corner:"black-corner"
				},
				white:{
					outline:"border-color-white black-corner",
					border:"border-color-white",
					corner:"black-corner"
				},
				color6:{
					outline:"color-1-6-outline color-1-6-corner",
					border:"color-1-6-outline",
					corner:"color-1-6-corner"
				}
			},
			scheme2:{
				color1:{
					outline:"color-2-1-outline color-2-1-corner",
					border:"color-2-1-outline",
					corner:"color-2-1-corner"
				},
				color2:{
					outline:"color-2-2-outline color-2-2-corner",
					border:"color-2-2-outline",
					corner:"color-2-2-corner"
				},
				color3:{
					outline:"color-2-3-outline color-2-3-corner",
					border:"color-2-3-outline",
					corner:"color-2-3-corner"
				},
				color4:{
					outline:"color-2-4-outline color-2-4-corner",
					border:"color-2-4-outline",
					corner:"color-2-4-corner"
				},
				color5:{
					outline:"color-2-5-outline color-2-5-corner",
					border:"color-2-5-outline",
					corner:"color-2-5-corner"
				}
			}
		}
	}

	var $homeMessage = true;

	var $calibration = {
		i:1,
		j:1
	}

	var $slideCalibration = {
		i:1,
		j:1
	}

	var homeMessage = {
		get:function () {
			return $homeMessage;
		},
		set:function (toggle) {

			$homeMessage = toggle === false || toggle === "false" ? false : true;
		}
	}

	var calibration = {
		set:function (dir, value) {
			$calibration[dir] = value;
		},
		get:function (dir) {
			return $calibration[dir];
		},
		reset:function () {

			$calibration = {
				i:1,
				j:1
			}
		},
		setSlide:function(dir, value) {
			$slideCalibration[dir] = value;
		},
		getSlide:function(dir) {
			return $slideCalibration[dir];
		},
		resetSlide:function () {
			$slideCalibration = {
				i:1,
				j:1
			}
		},
		resetBoth:function () {

			calibration.reset();
			calibration.resetSlide();
		}
	}

	var $marble = {
		id:"marble6",
		size:350
	}


	var marble = {
    	set:{
    		id:function (id) {
    			$marble.id = id;
    		},
    		size:function (size) {
    			$marble.size = size;
    		}
    	},
    	get:{
    		id:function () {
    			return $marble.id;
    		},
    		size:function () {
    			return $marble.size;
    		}
    	}
    }

	var deviceStandard = {
        standard:{
            text:"standard",
            color:"white-back",
            "text_color":"black"
        },
        switched:{
            text:"switched",
            color:"color7-back",
            "text_color":"white"
        }
    }

	var forced = false;
	var valid = false;
	var status = con.invalid;

	var forceValidity = function (_valid) {

		forced = true;
		valid = _valid;
		status = valid ? con.valid : con.invalid;
	}

	var setValidity = function (_valid) {

		valid = _valid;
		status = _valid ? con.valid : con.invalid;
	}

	var setState = function (state) {

		con.nextState = state;
	}

	var isForced = function () {

		return forced;
	}

	var isValid = function () {

		// console.log("called is valid", forced, valid, "\n\n\n\n\n\n")

		return forced ? true : valid;
	}

	var deviceStatus = function () {

		return status;
	}

	var getRandomPosition = function (arena, distance) {
		var side = Math.random();
		var loc = Math.random();
		
		if (side < 0.25) { //top
			return new vector(loc*$(arena).width(), -distance,0);
		}
		else if (side < 0.5) { //right
			return new vector($(arena).width() +distance, loc*$(arena).height(), 0);
		}
		else if (side < 0.75 ) { //bottom
			return new vector(loc*$(arena).width(), $(arena).height() + distance, 0);
		}
		else if (side < 1) { //left
			return new vector(-distance, loc*$(arena).height(), 0);
		}
		
	}

	var getRandomVelocity = function (arena, pos, $speed, options) {
		
		var width = $(arena).width();
		var height = $(arena).width();
		var spread = options ? options.spread : 20;
		var factor = options ? options.factor : 20;
		var minimum = factor*$speed;
		
		var box = {top:height*(1-0.8)/2, left:width*(1-0.8)/2, width:width*0.8, height:height*0.8};
		
		var topRand = Math.random();
		var leftRand = Math.random();
		var speed = spread*Math.random() + minimum;
		
		var end = new vector(leftRand*box.width + box.left, topRand*box.height + box.top, 0);
		
		var velocity = end.subtract(pos).unit();
		
		return velocity.multiply(speed);
		
	}

	var getDestroyPosition = function (pos, i) {
		return pos[i];
	}

	var intersectRect = function (one, two) {
		var r1 = {};
		var r2 = {};
		
		
		
		r1.left = $(one).position().left;
		r1.right = r1.left + $(one).width();
		r1.top =  $(one).position().top;
		r1.bottom = r1.top + $(one).height();
		
		r2.left = $(two).position().left;
		r2.right = r2.left + $(two).width();
		r2.top =  $(two).position().top;
		r2.bottom = r2.top + $(two).height();
		
		
		var result = !(r2.left >= r1.right || 
	           r2.right <= r1.left || 
	           r2.top >= r1.bottom ||
	           r2.bottom <= r1.top);
		
	  return result;
	}

	var aimedShape = function (one, two) {

		if (one.shape == con.square || two.shape == con.square) {
			return intersectRect(one.el(), two.el());	
		}
		else {
			
			var onevector = new vector(one.position.x + one.radius, one.position.y + one.radius, 0);
			var twovector = new vector(two.position.x + two.radius, two.position.y + two.radius, 0);
			
			var diff = onevector.subtract(twovector);
			
			if (diff.len() < one.radius + 0.3*two.radius) {
				return true;	
			}
			else {
				
				return false;	
			}
				
		}
		
		
	}

	var intersectShape = function (one, two) {

		if (one.shape == con.square || two.shape == con.square) {
			return intersectRect(one.el(), two.el());	
		}
		else {
			
			var onevector = new vector(one.position.x + one.radius, one.position.y + one.radius, 0);
			var twovector = new vector(two.position.x + two.radius, two.position.y + two.radius, 0);
			
			var diff = onevector.subtract(twovector);
			
			if (diff.len() < one.radius + two.radius) {
				return true;	
			}
			else {
				
				return false;	
			}
				
		}
		
		
	}

	var overlapShape = function (one, two, margin) {

		var oneVector = new vector(one.position.x + one.radius, one.position.y + one.radius, 0);
		var twoVector = new vector(two.position.x + two.radius, two.position.y + two.radius, 0);
		
		var diff = oneVector.subtract(twoVector);
		
		//console.log("length: " + diff.len() + "radius: " + one.radius + " radius: " + two.radius);

		if (diff.len() < one.radius - two.radius + margin) {
			return true;	
		}
		else {
			
			return false;	
		}


	}

	var makeAspect = function (input) {


        // the purpose of this function is to input outer boundary width and height limits, an optional aspect ratio, and an optional relative size factor 
        
        // this function will return a width and height that can be applied to an object 
        // so that it can always be visible within the boundary limits, 
        // and that it will maintain the intended aspect ratio and size factor relative to the boundary

        // the boundary limits are required, if not given, the function returns null 
        // the aspect ratio and factor are optional, if not given, the factor defaults to one, 
        // the aspect ratio defaults to the aspect ratio of the width and height given 

        var ww = input.width >= 0 ? input.width : null;
        var wh = input.height >= 0 ? input.height : null;

        var isWindow = input.window;

        // console.log("\n\n\n\n\n\n\ncorrectForAspect", input.id, "\n\n\n\n\n", "mobile", checkMobile(), "window", isWindow, "input width", input.width, "result", ww, "input height", input.height, "result", wh, "\n\n\n\n\n\n\n");

        if (ww instanceof Number || wh instanceof Number) {
            return null;
        }


        var factor = input.factor >= 0 ? input.factor : 1;
        var aspect = input.aspect >= 0 ? input.aspect : ww/wh;

        var ew = ww*factor;
        var eh = wh*factor;

        // console.log("\n\n\n\n\n\n\n\neffective dimesion", input.id,"\n\n\n\n\n\n", "mobile", checkMobile(),  "window", isWindow, "width", ew, "height", eh, "\n\n\n\n\n\n\n\n");

        // primary and alternate dimensions determined by device type, primary dimension does not receive an aspect ratio, alternate dimension does
        var pd = isWindow ? (checkMobile() ? ew : eh) : ew;
        var ad = isWindow ? (checkMobile() ? eh*aspect : ew/aspect) : eh;

        // console.log("\n\n\n\n\n\n\n\ndimensions", input.id,"\n\n\n\n\n\n\n", "mobile", checkMobile(), "window", isWindow,"primary", pd, "alternate", ad, "\n\n\n\n\n\n\n\n");

        // if the alternate dimension is larger than primary dimension (it is considered bigger than the frame), then we want to adjust each dimension so that the width and height are less than the input width and height
        if (ad != pd) {
            ad = pd;
            pd = ad/aspect;
        }


        // console.log("\n\n\n\n\n\n\n\ndimensions post", input.id,"\n\n\n\n\n\n\n", "mobile", checkMobile(), "window", isWindow, "primamry", pd, "alternate", ad, "\n\n\n\n\n\n\n\n");

        var _width = isWindow ? (checkMobile() ? ad : pd) : ad;
        var _height = isWindow ? (checkMobile() ? pd : ad) : pd;

        // console.log("\n\n\n\n\n\n\n\noutput", input.id,"\n\n\n\n\n\n\n", "mobile", checkMobile(),  "window", isWindow, "width", _width, "height", _height, "\n\n\n\n\n\n\n\n");

        return {
            width:_width,
            height:_height
        }


    }

	return {
		c:con,
		homeMessage:homeMessage,
		marble:marble,
		calibration:calibration,
		deviceStandard:deviceStandard,
    	forceValidity:forceValidity,
    	setValidity:setValidity,
    	isForced:isForced,
    	deviceStatus:deviceStatus,
    	isValid:isValid,
		setState:setState,
		getRandomPosition:getRandomPosition,
		getRandomVelocity:getRandomVelocity,
		getDestroyPosition:getDestroyPosition,
		aimedShape:aimedShape,
		intersectShape:intersectShape,
		intersectRect:intersectRect,
		overlapShape:overlapShape,
		correctForAspect:makeAspect
	}

}]);