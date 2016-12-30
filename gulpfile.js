const gulp = require("gulp");
const webpack = require("webpack-stream");
const named = require("vinyl-named");
const stylus = require("gulp-stylus");
const connect = require("gulp-connect");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const cssmin = require("gulp-cssmin");
const config = require("./config");
const fs = require("fs");
const glob = require("glob");
const proc = require("process");

const appsRoot = "apps/{" + config.apps.join(',') + "}";

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task("clean", () => {
	for (const path of glob.sync(config.dist +"/*.{html,js,css}")) {
		fs.unlink(path);
	}
});

gulp.task("build", ["build.html", "build.js", "build.styl"]);

gulp.task("build.html", () => {
	return gulp.src(appsRoot + "/*.html")
		.pipe(rename(path => path.dirname = ''))
		.pipe(gulp.dest(config.dist));
});

gulp.task("build.js", () => {
	const src = gulp.src(appsRoot + "/*.js")
		.pipe(named())
		.pipe(webpack(config.webpack));

		if (proc.env.NODE_ENV == 'production') {
			return src.pipe(uglify()).pipe(gulp.dest(config.dist));
		} else {
			return src.pipe(gulp.dest(config.dist));
		}

});

gulp.task("build.styl", () => {
	const src = gulp.src(appsRoot + "/*.styl")
		.pipe(stylus(config.stylus))
		.pipe(rename(path => path.dirname = ''));

	if (proc.env.NODE_ENV == 'production') {
		return src.pipe(cssmin()).pipe(gulp.dest(config.dist));
	} else {
		return src.pipe(gulp.dest(config.dist));
	}
});

gulp.task("server", ["build"], () => {
	connect.server(config.connect);
})
