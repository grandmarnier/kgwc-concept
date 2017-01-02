const gulp = require("gulp");
const webpack = require("webpack-stream");
const named = require("vinyl-named");
const stylus = require("gulp-stylus");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const cssmin = require("gulp-cssmin");
const config = require("./config");
const fs = require("fs");
const glob = require("glob");
const proc = require("process");
const browserSync = require("browser-sync").create();

const appsRoot = "apps/{" + config.apps.join(',') + "}",
	htmlSrc = appsRoot + "/*.html",
	jsSrc = appsRoot + "/*.js",
	stylSrc = appsRoot + "/*.styl";

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
	return gulp.src(htmlSrc)
		.pipe(rename(path => path.dirname = ''))
		.pipe(gulp.dest(config.dist));
});

gulp.task("build.js", () => {
	const src = gulp.src(jsSrc)
		.pipe(named())
		.pipe(webpack(config.webpack).on('error', (err) => {
			browserSync.notify("JS build failed");
		}));

		if (proc.env.NODE_ENV == 'production') {
			return src.pipe(uglify()).pipe(gulp.dest(config.dist));
		} else {
				return src.pipe(gulp.dest(config.dist));
		}
});

gulp.task("build.styl", () => {
	const src = gulp.src(stylSrc)
		.pipe(stylus(config.stylus).on('error', (_err) => {
			browserSync.notify("stylus build failed");
		}))
		.pipe(rename(path => path.dirname = ''));

	if (proc.env.NODE_ENV == 'production') {
		return src.pipe(cssmin()).pipe(gulp.dest(config.dist));
	} else {
		try {
			return src.pipe(gulp.dest(config.dist));
		} catch(_err) {
			browserSync.notify('stylus build failed');
		}
	}
});

gulp.task("server", ["build"], () => {
	browserSync.init(config.server);

	gulp.watch(htmlSrc, ["build.html"], () => browserSync.reload());
	gulp.watch(jsSrc, ["build.js"], () => browserSync.reload());
	gulp.watch(stylSrc, ["build.styl"], () => browserSync.stream());
});
