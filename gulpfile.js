const gulp = require("gulp");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const sass = require("gulp-sass")

sass.compiler = require("node-sass")

function html(done){
    gulp.src("./src/html/templates/*.ejs")
    .pipe(ejs())
    .pipe(rename(function(path){
        path.extname = ".html"
    }))
    .pipe(gulp.dest("./dist"))
    .pipe(connect.reload());
    done();
}

function watchHtml(done){
    gulp.watch("./src/html/**/*.ejs", { ignoreInitial: false}, html)
}

function scss(done) {
    gulp.src("src/css/**/*.scss")
        .pipe(sass().on("error", err => console.log(err)))
        .pipe(gulp.dest("dist/assets/css"))
        .pipe(connect.reload());
    done();
}
function watchScss() {
    gulp.watch("src/css/**/*.scss", { ignoreInitial: false }, scss);
}

gulp.task("dev", function(done){
    watchHtml()
    watchScss();
    connect.server({
        livereload: true,
        root: "dist"
    })
    done();
});
