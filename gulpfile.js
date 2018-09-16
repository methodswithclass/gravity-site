var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer'),
path = require("path"),
shell = require("gulp-shell"),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
del = require('del'),
inject = require('gulp-inject'),
filter = require("gulp-filter"),
merge = require("merge-stream"),
mainBowerFiles = require("gulp-main-bower-files"),
nodemon = require('gulp-nodemon'),
livereload = require('gulp-livereload');
sass = require("gulp-sass"),
babel = require("gulp-babel");

const config = require("./config.js");



var minify = config.gulp.minify;
var shimFile = config.gulp.shimFile;
var mainScripts = config.gulp.mainScripts;
var vendorScripts = config.gulp.vendorScripts;
var miscSrc = config.gulp.miscSrc;
var htmlDest = config.gulp.htmlDest;
var sassStyles = config.gulp.sassStyles;
var cssStyles = config.gulp.cssStyles;



var injectJS = function () {

	var important = gulp.src('dist/assets/js/vendor' + (!minify.vendor.full.make && minify.vendor.min.make && minify.vendor.min.inject ? ".min" : "") + '.js', {read: false});
	var standard = gulp.src(["dist/assets/js/main" + (!minify.main.full.make && minify.main.min.make && minify.main.min.inject ? ".min" : "") + ".js", 'dist/assets/**/*.css'], {read:false});

	return gulp.src('src/index.html')
	.pipe(inject(important, {ignorePath:"dist", starttag: '<!-- inject:head:{{ext}} -->'}))
	.pipe(inject(standard, {ignorePath:"dist"}))
	.pipe(gulp.dest('dist'));

}


var scripts = function() {


    var mainSrc = gulp.src(mainScripts)
	.pipe(concat('main.js'))
	.pipe(babel({
        presets: ["@babel/env"]
    }))

    if (minify.main.full.make) {
    	mainSrc.pipe(gulp.dest("dist/assets/js"))
	}

    var mainMin;

	if (minify.main.min.make) {
		mainMin = mainSrc
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/assets/js"))
	}

	
	return minify.main.min.make ? mainMin : mainSrc;

};

var tempVendor = function () {


	var shim = gulp.src(shimFile)
		.pipe(concat("shim.js"))
		.pipe(gulp.dest("temp/vendor"));

	var bowerSrc = gulp.src("bower.json")
		.pipe(mainBowerFiles({base:"bower_components"}))
		.pipe(filter("**/*.js"))
		.pipe(concat("bower.js"))
		.pipe(gulp.dest("temp/vendor"));

	var npmSrc = gulp.src(vendorScripts)
		.pipe(concat("npm.js"))
		.pipe(gulp.dest("temp/vendor"))


	return merge(shim, npmSrc, bowerSrc);
}

var vendor = function () {


	var js = gulp.src([
	                  "temp/vendor/shim.js",
	                  "temp/vendor/bower.js",
	                  "temp/vendor/**/*.js"
	                  ])
	.pipe(concat("vendor.js"))

	if (minify.vendor.full.make) {
		js.pipe(gulp.dest("dist/assets/js"))
	}

	var jsMin;

	if (minify.vendor.min.make) {
		jsMin = js
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/assets/js"))
	}

	// var css = gulp.src("./bower.json")
	// .pipe(mainBowerFiles())
	// .pipe(filter("**/*.css"))
	// .pipe(concat("vendor.css"))
	// .pipe(gulp.dest("dist/assets/css"));


	// if (minify) {
	// 	return merge(js, jsMin, css);
	// }
	// else {
	// 	return merge(js, css);
	// }

	return minify.vendor.min.make ? jsMin : js;

};

var apiSass = function () {
  return gulp.src(sassStyles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('temp/'));
}


var styles = function() {


	// middleware.compileSass();


	var cssSrc = gulp.src(cssStyles)
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'));

	
	var css = cssSrc
	.pipe(concat("styles.css"))
	.pipe(gulp.dest('dist/assets/css'));

	return css;
};



var html = function () {

	return gulp.src('src/**/*.html')
	.pipe(gulp.dest(htmlDest))
};

var images = function() {
	return gulp.src('src/assets/img/**/*')
	.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
	.pipe(gulp.dest('dist/assets/img'));
};


var fonts = function () {

	var mainFonts = gulp.src("src/assets/fonts/**/*.*")
	.pipe(gulp.dest("dist/assets/fonts"))

	var vendorFonts = gulp.src("node_modules/@fortawesome/fontawesome-free/webfonts/*.*")
	.pipe(gulp.dest("dist/assets/webfonts"))

	return merge(mainFonts, vendorFonts);
};

var index = function () {

	return gulp.src([ 
    "./favicon.ico"
    ]).pipe(gulp.dest("dist"));
}

var misc = function() {
	// return gulp.src(miscSrc)
	// .pipe(gulp.dest('dist/assets'));

	// return merge(miscSrc);

	if (typeof miscSrc === "function") {
		return miscSrc();
	}
	else if (miscSrc) {
		return gulp.src(miscSrc)
		.pipe(gulp.dest('dist/assets'));
	}
	else return new Promise(function (resolve) {
		resolve();
	})
};

var clean = function() {
	return del(['dist', "temp"]);
}


var serveFunc = function (done) {


	livereload.listen({port:config.livereloadPort});

	var stream = nodemon({ 
		script: path.join(__dirname, "server.js"),
		ext:"js html css scss json",
		watch:["./src", "config.js"],
		tasks:["build"]
	});


	stream.on("start", function () {

		done();
	})

	stream.on("restart", function () {

		setTimeout(function () {

			try {
				livereload.reload();
			}
			catch (err) {
				console.log("cannot livreload at this time", err);
			}

			done();

		}, 2000);

	})

	stream.on("crash", function () {
		
		stream.emit('restart', 10);
	})

	return stream;
	
}

var copy = gulp.parallel(misc, index, html, images, fonts)

var compile = gulp.parallel(gulp.series(tempVendor, vendor), scripts);

var buildTask = gulp.series(compile, gulp.parallel(gulp.series(apiSass, styles), copy), injectJS);

var serveTask = gulp.series(clean, buildTask, serveFunc);



gulp.task("build", buildTask);

gulp.task("serve", serveTask);









