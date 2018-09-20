

var gulp = require("gulp");
var merge = require("merge-stream");
var imagemin = require('gulp-imagemin');



var htmlDest = "dist/";

var mainScripts = [
	"src/assets/js/supporting-code.js",
	"src/components/interface/touch/touch.module.js",
    "src/components/utility/utility.module.js",
    "src/components/data/data.module.js",
	"src/components/validate/validate.module.js",
	"src/components/games/games.module.js",
	"src/components/games/balance/balance.module.js",
	"src/components/games/enemy/enemy.module.js",
	"src/components/games/space/space.module.js",
	"src/components/manager/manager.module.js",
	"src/components/state/state.module.js",
	"src/components/interface/interface.module.js",
	"src/components/settings/settings.module.js",
	"src/components/calibration/calibrate.module.js",
	"src/components/controllers/controller.module.js",
	"src/components/main.js",
	"src/components/**/*.js"
]


var sassStyles = [
	"src/assets/css/classes.scss",
	"src/assets/css/**/*.scss"
]

var cssStyles = [
	'temp/**/*.css',
	"node_modules/@fortawesome/fontawesome-free/css/all.css"
]


var shimFile = "node_modules/@babel/polyfill/dist/polyfill.js";


var vendorScripts = [
	//npm packages for front end use,
	"node_modules/jquery.scrollto/jquery.scrollTo.min.js",
	"node_modules/mc-shared/shared.js"
]



var miscSrc = null;


// var minify = process.env.NODE_ENV == "production";

var minify = {
	main:{
		full:{
			make:true,
			inject:false
		},
		min:{
			make:true,
			inject:true
		}
	},
	vendor:{
		full:{
			make:true,
			inject:true
		},
		min:{
			make:false,
			inject:false
		}
	}
}



var livereloadPort = 4420;


module.exports = {
	gulp:{
		shimFile:shimFile,
		htmlDest:htmlDest,
		mainScripts:mainScripts,
		vendorScripts:vendorScripts,
		sassStyles:sassStyles,
		cssStyles:cssStyles,
		miscSrc:miscSrc,
		minify:minify
	},
	livereloadPort:livereloadPort
}



